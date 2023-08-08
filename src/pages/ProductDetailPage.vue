<template>
	<div>
		<main class="product-details">
			<div class="container">
				<!-- default start -->
				<div class="row mt-5">
					<div class="col-md-7">
						<zoom-slider/>
					</div>
					<div class="col-md-5 max-width">
						<purchase-quantity/>
					</div>
				</div>
				<!-- default end -->
				<div class="row mt-5">
					<div class="col-12 text-center">
						<div>
							<h2>You may also like</h2>
							<img src="/assets/images/border-line.svg">
						</div>
					</div>
				</div>
				<div class="row eliminator-cards mt-5">
					<div class="col-md-3">
						<product-card/>
					</div>
					<div class="col-md-3">
						<product-card/>
					</div>
					<div class="col-md-3">
						<product-card/>
					</div>
					<div class="col-md-3">
						<product-card/>
					</div>
				</div>
			</div>

		</main>
	</div>
</template>

<script>
import ProductCard from "@/components/ProductCard";
import ZoomSlider from "@/components/ZoomSlider";
import PurchaseQuantity from "@/components/PurchaseQuantity";

export default {
	name: "ProductDetailPage",
	components: {
		'product-card': ProductCard,
		'zoom-slider': ZoomSlider,
		'purchase-quantity': PurchaseQuantity,
	}

}
</script>
<style scoped>

</style>