<template>
  <footer :text="['center', 'lg-start']" class="footer">
    <!-- Copyright -->
    <div class="text-center p-3">
      © 2023 Copyright: Zontec
      <!-- <a style="color: white;" href="https://roboflex.com.br/" target="_blank">Roboflex</a> -->
    </div>
    <!-- Copyright -->
  </footer>
</template>

<style >
.footer {
  width: 100%;
  background: linear-gradient(180deg, #2D2D2D 0%, #282929 51.54%, #181818 100%);
  color: #ffffff;
  position: fixed;
  bottom: 0;
  left: 0;
}

@media (max-width: 576px) {
  /* Adjust styles for small screens (up to 576px wide) */
  .footer {
    font-size: 14px;
  }
}

@media (min-width: 577px) and (max-width: 991px) {
  /* Adjust styles for medium screens (577px to 991px wide) */
  .footer {
    font-size: 16px;
  }
}

@media (min-width: 992px) {
  /* Adjust styles for large screens (992px and wider) */
  .footer {
    font-size: 18px;
  }
}
</style>
