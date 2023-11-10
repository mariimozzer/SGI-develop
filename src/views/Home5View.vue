<template>
  <div class="ag-offer-block">
    <div class="ag-format-container">
      <ul class="ag-offer_list">
        <li class="ag-offer_item">
          <div class="ag-offer_visible-item">
            <div class="ag-offer_img-box">
              <img src="https://raw.githack.com/SochavaAG/example-mycode/master/pens/1_images/icon-64-1.svg" class="ag-offer_img" alt="" />
            </div>
            <div class="ag-offer_title">
              Lorem ipsum
            </div>
          </div>
          <div class="ag-offer_hidden-item">
            <p class="ag-offer_text">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.
            </p>
          </div>
        </li>
        <!-- Os outros itens aqui -->
      </ul>
    </div>
  </div>
</template>

<script>
export default {

}

// - Noel Delgado | @pixelia_me

const nodes = [].slice.call(document.querySelectorAll('li'), 0);
const directions = { 0: 'top', 1: 'right', 2: 'bottom', 3: 'left' };
const classNames = ['in', 'out'].map((p) => Object.values(directions).map((d) => `${p}-${d}`)).reduce((a, b) => a.concat(b));

const getDirectionKey = (ev, node) => {
  const { width, height, top, left } = node.getBoundingClientRect();
  const l = ev.pageX - (left + window.pageXOffset);
  const t = ev.pageY - (top + window.pageYOffset);
  const x = (l - (width/2) * (width > height ? (height/width) : 1));
  const y = (t - (height/2) * (height > width ? (width/height) : 1));
  return Math.round(Math.atan2(y, x) / 1.57079633 + 5) % 4;
}

class Item {
  constructor(element) {
    this.element = element;
    this.element.addEventListener('mouseover', (ev) => this.update(ev, 'in'));
    this.element.addEventListener('mouseout', (ev) => this.update(ev, 'out'));
  }

  update(ev, prefix) {
    this.element.classList.remove(...classNames);
    this.element.classList.add(`${prefix}-${directions[getDirectionKey(ev, this.element)]}`);
  }
}

nodes.forEach(node => new Item(node));
</script>

<style scoped>
/* O estilo CSS aqui permanece o mesmo */
</style>
