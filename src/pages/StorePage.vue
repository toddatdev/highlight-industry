<template>
	<main class="highlight-page">
		<div class="container">
			<div class="row mt-5">
				<div class="col-lg-3">
					<products-filter/>
				</div>
				<div class="col-lg-9">
					<div class="d-block d-lg-flex justify-content-between mt-5 mt-lg-0">
						<div>
							<h4 class="fw-bolder">Eliminators <span class="fw-lighter">(6563)</span></h4>
						</div>
						<div class="d-block d-sm-flex text-center text-sm-start mt-4 mt-lg-0">
							<div class="dropdown fw-bolder ms-0 ms-sm-5 text-start d-flex align-items-center">
								<label for="secondDropdown" class="pe-3">Show</label>
								<select class="form-select" aria-label="Default select example" id="secondDropdown">
									<option selected>30</option>
									<option value="1">One</option>
									<option value="2">Two</option>
									<option value="3">Three</option>
								</select>

							</div>

							<!-- second button -->
							<div class="dropdown fw-bolder ms-0 ms-sm-5 text-start d-flex align-items-center mt-3 mt-sm-0">
								<label for="secondDropdown" class="pe-3">Sort</label>
								<select class="form-select" aria-label="Default select example" id="secondDropdown">
									<option selected>Open this select menu</option>
									<option value="1">One</option>
									<option value="2">Two</option>
									<option value="3">Three</option>
								</select>

							</div>
						</div>
					</div>
					<!-- cards -->
					<div class="row eliminator-cards mt-5">
						<div class="col-md-4">
							<product-card/>
						</div>

						<!-- card 2 -->
						<div class="col-md-4">
							<product-card/>
						</div>
						<!-- card 3 -->
						<div class="col-md-4">
							<product-card/>
						</div>
					</div>
					<div class="row eliminator-cards mt-5">
						<div class="col-md-4">
							<product-card/>
						</div>
						<!-- card 2 -->
						<div class="col-md-4">
							<product-card/>
						</div>
						<!-- card 3 -->
						<div class="col-md-4">
							<product-card/>
						</div>
					</div>
					<div class="row eliminator-cards mt-5">
						<div class="col-md-4">
							<product-card/>
						</div>
						<!-- card 2 -->
						<div class="col-md-4">
							<product-card/>
						</div>
						<!-- card 3 -->
						<div class="col-md-4">
							<product-card/>
						</div>
					</div>
					<div class="row my-5">
						<div class="col-12 text-center">
							<button class="btn btn-green py-2 px-4">Show More</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</main>
</template>

<script>
import ProductsFilter from "@/components/ProductsFilter";
import ProductCard from "@/components/ProductCard";

export default {
	name: "StorePage",
	components: {
		'products-filter': ProductsFilter,
		// eslint-disable-next-line vue/no-unused-components
		"product-card": ProductCard,

	},
}

</script>

<style scoped>

</style>