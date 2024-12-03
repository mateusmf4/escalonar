<script lang="ts">
  import Matrix from './lib/matrix';
  console.log(Matrix);
  // window.Matrix = Matrix;

  let nums = $state([0,0,0,0,0,0]);
  let escalonada = $state(Matrix.fromFlatNums(2, 3, [0,0,0,0,0,0]));
  $effect(() => {
    let matrix = Matrix.fromFlatNums(2, 3, nums);
    matrix.escalonar();
    escalonada = matrix;
  });
</script>

<main class="min-h-screen bg-slate-700 text-white">
  <div class="flex flex-col items-center pt-10">
    <div class="grid grid-cols-3 grid-rows-2 gap-3">
      {#each nums as x, i}
        <input type="text" bind:value={nums[i]} class="rounded border-2 shadow text-black px-4 py-1 w-20">
      {/each}
    </div>
    <p>{nums}</p>
    <p>{escalonada.vals}</p>
    <div class="grid grid-cols-3 grid-rows-2 gap-3">
      {#each nums as _, i}
        <span class="rounded border-2 shadow text-black px-4 py-1 w-20 bg-white">{escalonada.getFlat(i)}</span>
      {/each}
    </div>
</div>
</main>