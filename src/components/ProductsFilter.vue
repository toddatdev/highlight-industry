<template>
  <section>
        <h4>Narrow Your Results</h4>
        <p class="pt-2 fs-5">Search</p>
        <div class="mt-3">
          <input type="email" class="form-control py-3" id="exampleInputEmail1" placeholder="Search Here"
                 aria-describedby="emailHelp">
      </div>
      <div class="border-silver my-4"></div>
      <div class="card border-0 mb-3 categories-card">
        <div class="card-header bg-transparent border-silver">Category</div>
        <div class="card-body border-silver">
          <div class="card-text">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
              <label class="form-check-label" for="flexCheckDefault">
                Dedicated Bundlers
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="">
              <label class="form-check-label" for="flexCheckChecked">
                Eliminators
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
              <label class="form-check-label" for="flexCheckDefault">
                Fantoms
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked">
              <label class="form-check-label" for="flexCheckChecked">
                Handheld Tape Dispensers
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked">
              <label class="form-check-label" for="flexCheckChecked">
                Handwrapper Parts
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="">
              <label class="form-check-label" for="flexCheckChecked">
                Machine Parts
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="">
              <label class="form-check-label" for="flexCheckChecked">
                Stretch Band-Its
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="">
              <label class="form-check-label" for="flexCheckChecked">
                Stretch Film Sales Aids
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="">
              <label class="form-check-label" for="flexCheckChecked">
                Turntables
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
              <label class="form-check-label" for="flexCheckDefault">
                Dedicated Bundlers
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="">
              <label class="form-check-label" for="flexCheckChecked">
                Eliminators
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
              <label class="form-check-label" for="flexCheckDefault">
                Fantoms
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked">
              <label class="form-check-label" for="flexCheckChecked">
                Handheld Tape Dispensers
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked">
              <label class="form-check-label" for="flexCheckChecked">
                Handwrapper Parts
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="">
              <label class="form-check-label" for="flexCheckChecked">
                Machine Parts
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="">
              <label class="form-check-label" for="flexCheckChecked">
                Stretch Band-Its
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="d-grid justify-content-center text-center text-lg-start">
        <p class="fs-5 fw-medium">Price Range</p>
        <div class="range-slider">
          <span class="rangeValues text-start mb-3"></span>
          <input value="1000" min="1000" max="50000" step="500" type="range">
          <input value="50000" min="1000" max="50000" step="500" type="range">
        </div>
      </div>
      <div class="text-center">
        <button class="btn btn-green mt-5 d-block w-100 py-3 font-ubuntu">Apply Filters</button>
      </div>
  </section>
</template>


<script>
export default {
  name: "CategoriesFilter"
}
</script>