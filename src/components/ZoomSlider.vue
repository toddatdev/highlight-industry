

<template>
  <div>
    <div class="xzoom-container d-block">
      <img class="xzoom" id="xzoom-default"
           src="/assets/images/zoom-img.jpg"
           xoriginal="/assets/images/zoom-img.jpg" />
      <div class="xzoom-thumbs d-block float-start">
        <a
            href="/assets/images/zoom-img.jpg"><img
            class="xzoom-gallery" width="150"
            src="/assets/images/zoom-img.jpg"
            xpreview="/assets/images/zoom-img.jpg"
            title="The description goes here"></a>

        <a
            href="/assets/images/flip-image.png"><img
            class="xzoom-gallery" width="150"
            src="/assets/images/flip-image.png"
            title="The description goes here"></a>

        <a
            href="/assets/images/zoom-img.jpg"><img
            class="xzoom-gallery" width="150"
            src="/assets/images/zoom-img.jpg"
            title="The description goes here"></a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
  name:"ZoomSlider",
  }
</script>
