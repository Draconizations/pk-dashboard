<script lang="ts">
	import { browser } from '$app/environment'
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'
	import { ChevronLeft, ChevronRight, PaginationItem } from 'flowbite-svelte'

	const normalClass =
		'text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white rounded-none text-xs'
	const activeClass =
		'text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-blue-700 dark:text-white rounded-none text-xs'

	export let listLength: number
	export let pageLength: number
    export let activePage: number
    
	$: pageAmount = Math.ceil(listLength / pageLength)

	$: pages = createPaginationArray(pageAmount, activePage)

	function createPaginationArray(pageAmount: number, currentPage: number) {
		let pages = [
			{
				name: '1',
				href: getSearchParamUrl(1),
				active: currentPage === 1
			}
		]
		if (pageAmount === 1) {
			return pages
		}

        if (currentPage - 2 > 2) {
            pages.push({
                name: "...",
                href: "",
                active: false
            })
        } else if (currentPage - 2 > 1) {
			pages.push({
                name: (currentPage - 2).toString(),
                href: getSearchParamUrl(currentPage),
                active: false
            })
		}

		if (currentPage - 1 > 1) {
            pages.push({
                name: (currentPage - 1).toString(),
                href: getSearchParamUrl(currentPage),
                active: false
            })
        }

		if (currentPage !== 1 && currentPage !== pageAmount) {
			pages.push({
				name: currentPage.toString(),
				href: getSearchParamUrl(currentPage),
				active: true
			})
		}

		if (currentPage + 1 < pageAmount) {
            pages.push({
                name: (currentPage + 1).toString(),
                href: getSearchParamUrl(currentPage),
                active: false
            })
        }

        if (currentPage + 2 < pageAmount - 1) {
            pages.push({
                name: "...",
                href: "",
                active: false
            })
        } else if (currentPage + 2 < pageAmount) {
			pages.push({
                name: (currentPage + 2).toString(),
                href: getSearchParamUrl(currentPage),
                active: false
            })
		}

		if (pageAmount > 1) {
			pages.push({
				name: pageAmount.toString(),
				href: getSearchParamUrl(pageAmount),
				active: currentPage === pageAmount
			})
		}

		return pages
	}

	function getSearchParamUrl(page: number) {
		const searchParams = $page.url.searchParams
		searchParams.set('page', page.toString())
		return '?' + searchParams.toString()
	}

	function previous() {
		if (activePage > 1) {
			goto(getSearchParamUrl(activePage - 1))
			activePage = activePage - 1
		}
	}

	function next() {
		if (activePage < pageAmount) {
			goto(getSearchParamUrl(activePage + 1))
			activePage = activePage + 1
		}
	}

    function navigate(number: string) {
        if (number === "...") {
            if (browser) {
                let page = parseInt(window.prompt("Navigate to page number", "") || "")
                if (isNaN(page) || page > pageAmount || page < 1) {
                    window.alert("Not a valid page.")
                    return
                }
                goto(getSearchParamUrl(page))
                activePage = page
                return
            }
        }

        const aaa = parseInt(number)
        activePage = aaa
    }
</script>

<nav aria-label="Page navigation" class="flex min-w-0 shrink overflow-auto pb-2 pb-sm-0">
	<ul class="inline-flex -space-x-px items-stretch divide-x">
		<li class="flex items-stretch shrink">
			<PaginationItem on:click={previous} class={`${normalClass} rounded-l-md`}>
				<ChevronLeft size="1em"/>
			</PaginationItem>
		</li>
		{#each pages as { name, href, active }}
			<li class="shrink border-none">
				<PaginationItem {active} on:click={() => navigate(name)} {activeClass} {normalClass} {href}>{name}</PaginationItem>
			</li>
		{/each}
		<li class="flex items-stretch shrink border-none">
			<PaginationItem on:click={next} class={`${normalClass} rounded-r-md`}>
				<ChevronRight size="1em" />
			</PaginationItem>
		</li>
	</ul>
</nav>
