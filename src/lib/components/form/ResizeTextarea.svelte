<script lang="ts">
	export let value: string = ""
	export let minRows: number = 1
	export let maxRows: number | undefined = undefined
    export let id: string
    export let placeholder = ""
	export let maxLength: number = 1000
	
	$: minHeight = `${1 + minRows * 1.5}em`
	$: maxHeight = maxRows ? `${1 + maxRows * 1.5}em` : `auto`

    let defaultClass = "w-full rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:placeholder-gray-400 dark:text-white  border border-gray-200 dark:border-gray-600 p-2.5 text-sm focus-visible:outline-none focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 resize-none"
</script>

<div class="container">
	<pre
		aria-hidden="true"
		style="min-height: {minHeight}; max-height: {maxHeight}"
	>{value + '\n'}</pre>

	<textarea class={defaultClass} bind:value {id} {placeholder} maxlength={maxLength} ></textarea>	
</div>

<style>
	.container {
		position: relative;
	}

	pre {
		white-space: pre-wrap;
		font-size: 0.875rem;
	}
	
	pre, textarea {
		font-family: inherit;
		padding: 0.625rem;
		line-height: 1.5;
		overflow: hidden;
	}
	
	textarea {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		resize: none;
	}
</style>