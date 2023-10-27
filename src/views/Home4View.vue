<template>
    <div class="setBackground">

        <div class="three-columns" style="justify-content: center; color: white; text-align: center;">
        <div class="column" id="column1" >
          <br><br>
          <img  src="../../public/img/admColorido.png"  width="500px"><br><br>

        </div>
        <div class="column" id="column2">
          <br><br>
          <img  src="../../public/img/fabricaColorido.png"  width="500px"><br><br>
        
        </div>
        <div class="column" id="column3">
          <br><br>
          <img  src="../../public/img/gestaoColorido.png"  width="500px"><br><br>
      

        </div>
      </div>
    </div>
</template>

<script>

</script>

<style> 
 .three-columns {
      display: flex;
      width: 20vw;
      height: 20vh;
      justify-content: space-between center;
      align-items: center;


  }
  .column {
      flex: 1;
      height: 100%;
      margin: 0px; 
      
  }
    
  #column1 {
     border: 10px solid none;
      background-color: var(--first-color);
  }
  
  #column2 {
      border: 10px solid  none;
      background-color:#393D40;
  }
  
  #column3 {
      border: 10px solid none;
      background-color:#515558;
  }
</style>
