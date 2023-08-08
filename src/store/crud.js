import Vue from 'vue'
import get from 'lodash/get'
import uniqBy from 'lodash/uniqBy'
import omit from 'lodash/omit'
import axios from 'axios'

let promises = []

export default class {
    constructor(endpoint, options = {}) {
        let crud = this
        this.idKey = 'id'
        this.includeIdKeyInRequestBody = false
        Object.entries(options).forEach(([key, value]) => {
            this[key] = value
        })
        this.getEndpoint = (_options) => {
            if (typeof endpoint === 'function') {
                return endpoint(_options)
            }
            return endpoint
        }

        this.mutations = {
            setData(state, data = []) {
                state.data = data
            },
            setMeta(state, meta = {}) {
                state.meta = meta
            },
            setLoading(state, loading) {
                state.loading = loading
            },
            insertRecord(state, record) {
                if (!record && record[crud.idKey]) {
                    return
                }
                state.data = uniqBy([
                    ...(state.data || []),
                    record
                ], crud.idKey)
            },
            updateRecord(state, record) {
                let existingRecord = state.data.find(r => r[crud.idKey] + '' === record[crud.idKey] + '')
                if (existingRecord) {
                    Vue.set(state.data, state.data.indexOf(existingRecord), record)
                }
            },
            updateOrInsertRecord(state, record) {
                let existingRecord = state.data.find(r => r[crud.idKey] + '' === record[crud.idKey] + '')
                if (existingRecord) {
                    Vue.set(state.data, state.data.indexOf(existingRecord), record)
                } else {
                    if (!record && record[crud.idKey]) {
                        return
                    }
                    state.data = uniqBy([
                        ...(state.data || []),
                        record
                    ], crud.idKey)
                }
            },
            deleteRecord(state, record) {
                state.data = state.data.filter(r => r[crud.idKey] + '' !== record[crud.idKey] + '')
            }
        }

        this.actions = {
            async populate({state}) {
                if (state && state.data && state.data.length) {
                    return
                }
                await this.find()
            },
            async find({commit, dispatch}, params = {}) {
                let _options = params
                if (params.params) {
                    _options = params
                    params = params.params
                }
                commit('setLoading', true)
                let promise
                try {
                    promise = axios({method: 'GET', url: crud.getEndpoint(_options), params})
                    promises.push(promise)
                    let response = await promise
                    commit('setData', get(response, 'data' + (crud.rowsProp !== false ? '.' + (crud.rowsProp || 'rows') : '')))
                    commit('setMeta', get(response, 'data') || {})
                    commit('setLoading', false)
                    promises = promises.filter(p => p !== promise)
                } catch (e) {
                    commit('setLoading', false)
                    promises = promises.filter(p => p !== promise)
                    throw e
                }
            },
            async get({commit, dispatch, state}, id) {
                if (state.loading) {
                    await Promise.all(promises)
                }
                let _options = {}
                if (Array.isArray(id)) {
                    _options = get(id, '1') || {}
                    id = id[0] || {}
                }
                commit('setLoading', true)
                let promise
                try {
                    promise = axios({method: 'GET', url: `${crud.getEndpoint(_options)}/${id}`})
                    promises.push(promise)
                    let response = await promise
                    let record = response.data
                    commit('updateRecord', record)
                    commit('setLoading', false)
                    let storeRecord = (state.data || []).find(r => r[crud.idKey] + '' === id + '')
                    promises = promises.filter(p => p !== promise)
                    return storeRecord || record
                } catch (e) {
                    promises = promises.filter(p => p !== promise)
                    commit('setLoading', false)
                    throw e
                }
            },
            async create({commit, dispatch, state}, data) {
                if (state.loading) {
                    await Promise.all(promises)
                }
                let _options
                if (Array.isArray(data)) {
                    _options = get(data, '1') || {}
                    data = data[0] || {}
                }
                console.log('data', data, _options)
                let promise
                commit('setLoading', true)
                try {
                    promise = axios({method: 'POST', url: crud.getEndpoint(_options), data: data})
                    promises.push(promise)
                    let response = await promise
                    let record = response.data
                    if (!record && data[crud.idKey]) {
                        // Retrieve the record now since the api doesn't just respond with it...
                        record = await crud.actions.get({
                            commit,
                            dispatch,
                            state
                        }, _options ? [data[crud.idKey], _options] : data[crud.idKey])
                    } else if (response.headers.location) {
                        let id = get(response, 'headers.location').split('/').pop()
                        if (!isNaN(id * 1)) {
                            record = await crud.actions.get({commit, dispatch, state}, _options ? [id, _options] : id)
                        }
                    }
                    if (record) {
                        commit('setData', [
                            ...(state.data || []).filter(r => r[crud.idKey] + '' !== record[crud.idKey] + ''),
                            record
                        ])
                    }
                    commit('setLoading', false)
                    promises = promises.filter(p => p !== promise)
                    return (state.data || []).find(r => r[crud.idKey] + '' === record[crud.idKey] + '')
                } catch (e) {
                    promises = promises.filter(p => p !== promise)
                    commit('setLoading', false)
                    throw e
                }
            },
            async update({commit, dispatch, state}, data) {
                let _options = {}
                if (Array.isArray(data)) {
                    _options = get(data, '1') || {}
                    data = data[0] || {}
                }
                if (!data[crud.idKey]) {
                    throw new Error('id is required for update')
                }
                if (state.loading) {
                    await Promise.all(promises)
                }
                let promise
                commit('setLoading', true)
                try {
                    promise = axios({
                        method: _options.method || 'PATCH',
                        url: `${crud.getEndpoint(_options)}/${data[crud.idKey]}`,
                        data: omit(data, crud.includeIdKeyInRequestBody ? [] : [crud.idKey])
                    })
                    promises.push(promise)
                    let response = await promise
                    let record = response.data
                    promises = promises.filter(p => p !== promise)
                    if (!record && data[crud.idKey]) {
                        // Retrieve the record now since the api doesn't just respond with it...
                        record = await crud.actions.get({commit, dispatch, state}, data[crud.idKey])
                    }
                    if (record) {
                        commit('updateRecord', record)
                    }
                    commit('setLoading', false)
                    let storeRecord = (state.data || []).find(r => r[crud.idKey] + '' === record[crud.idKey] + '')
                    return storeRecord || record
                } catch (e) {
                    promises = promises.filter(p => p !== promise)
                    commit('setLoading', false)
                    throw e
                }
            },
            async save({dispatch}, originalData) {
                let _options = {}
                console.log('orig data', originalData)
                originalData = JSON.parse(JSON.stringify(originalData))
                console.log('orig data', originalData)
                let data = originalData
                if (Array.isArray(data)) {
                    _options = get(data, '1') || {}
                    data = data[0] || {}
                }
                // forceCreate is used on the User model because email is the primary key rather than an id
                if (data[crud.idKey] && !get(_options, 'forceCreate')) {
                    return dispatch('update', originalData)
                } else {
                    return dispatch('create', originalData)
                }
            },
            async delete({commit, state}, id) {
                if (state.loading) {
                    await Promise.all(promises)
                }
                let _options = {}
                if (Array.isArray(id)) {
                    _options = get(id, '1') || {}
                    id = id[0] || {}
                }
                if (!id) {
                    throw new Error('id is required for update')
                }
                let promise
                commit('setLoading', true)
                try {
                    promise = axios({method: 'DELETE', url: `${crud.getEndpoint(_options)}/${id}`})
                    promises.push(promise)
                    await promise
                    commit('setData', (state.data || []).filter(r => r[crud.idKey] + '' !== id + ''))
                    commit('setLoading', false)
                    promises = promises.filter(p => p !== promise)
                } catch (e) {
                    promises = promises.filter(p => p !== promise)
                    commit('setLoading', false)
                    throw e
                }
            }
        }
    }
}
