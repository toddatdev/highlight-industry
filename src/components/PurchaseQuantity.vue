<template>
  <div>
    <p class="fs-3 green-text fw-bolder">$69.99</p>
    <p class="fw-bolder fs-4">Eliminator Wood Bundler</p>
    <div class="wrap pt-3">
      <h5 class="fw-medium">quantity</h5>
      <div class="counter">
        <input class="counter__input" type="text" value="1" name="counter" size="5" readonly="readonly"/><a
          class="counter__increment" href="#">+</a><a class="counter__decrement" href="#">&ndash;</a>
      </div>
    </div>
    <div class="d-flex mt-5 eliminator-buttons">
      <button class="btn btn-lg bg-white border">Add to Wishlist</button>
      <button class="btn btn-lg btn-green"><i class="fa fa-shopping-cart pe-3"></i> Add to Cart</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "PurchaseQuantity",
}
</script>