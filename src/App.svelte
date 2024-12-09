<script lang="ts">
  import Matrix from './lib/matrix';
  console.log(Matrix);
  // window.Matrix = Matrix;

  
  let rows = $state(2);
  let cols = $state(3);
  let nums = $state([0,0,0,0,0,0]);
  let inputs: HTMLInputElement[] = $state([]);
  let escalonada = $derived.by(() => {
    let matrix = Matrix.fromFlatNums(rows, cols, nums);
    matrix.escalonar();
    return matrix;
  });
  $effect(() => {
    nums = new Array(rows * cols).fill(0);
  });

  function onKeyDown(event: KeyboardEvent) {
    if (event.key.startsWith("Arrow")) {
      let index = inputs.findIndex(ipt => ipt == event.target);
      switch (event.key) {
        case "ArrowLeft":
          index--;
          break;
        case "ArrowRight":
          index++;
          break;
        case "ArrowDown":
          index += cols;
          break;
        case "ArrowUp":
          index -= cols;
          break;
      }
      inputs[index].select();

      event.preventDefault();
    }
  }
</script>

<main class="min-h-screen bg-slate-700 text-white">
  <div class="flex flex-col items-center pt-10">
    <div class="grid grid-cols-3 grid-rows-2 gap-3">
      {#each nums as _, i}
        <input type="number" bind:value={nums[i]} bind:this={inputs[i]} onkeydown={e => onKeyDown(e)} class="rounded border-2 shadow text-black px-4 py-1 w-20">
      {/each}
    </div>
    <p>{nums}</p>
    <p>{escalonada.vals}</p>
    <div class="grid grid-cols-3 grid-rows-2 gap-3">
      {#each nums as _, i}
        <span class="rounded border-2 shadow text-black px-4 py-1 w-20 bg-white overflow-clip">{escalonada.getFlat(i)}</span>
      {/each}
    </div>
  </div>
</main>

<style>
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type=number] {
    -moz-appearance: textfield;
    appearance: textfield;
  }
</style>