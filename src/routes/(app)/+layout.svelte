<script>
    import '../../app.css';
    import { fade, slide } from 'svelte/transition';
    import { page } from '$app/stores';
    import {goto} from "$app/navigation";
    import { t } from "$lib/i18n";
    import palette from "../../theme/palette.js";
    import {headerClicked} from '$lib/store'

    let { children, data } = $props();
    let menuVisible = $state(false)
    let showNav = $state(true)
    let itemActive = $state('')
    let menuItems = [
        {url: '/', value: 'Dashboard'},
        {url: '/map', value: 'Mapa'},
        {url: '/map/reports/route', value: t('Relatórios')},
        {url: '/rep', value: t('Relatórios Gestão')},
        {url: '/map/settings/preferences', value: t('Definições')}
    ]
    if (data.session && data.session.deviceLimit === -1) {
        menuItems.push({url: '/cfg', value: t('Config')})
        menuItems.push({url: '/licenses', value: t('Licenses')})
    }

    const logout = () => fetch('/api/session', { method: 'DELETE' })
        .then(() => goto('/login'));

</script>

<div class="h-full flex flex-col">
    {#if showNav}
    <nav class="hidden bg-lightBg dark:bg-darkBg lg:block z-50"
         style="box-shadow: 0 3px 3px -2px #0003,0 3px 4px #00000024,0 1px 8px #0000001f" transition:slide={{ duration: 500 }}
    >
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div class="flex h-12 items-center justify-between">
                <div class="flex items-center">
                    <div class="flex-shrink-0">
                        <img class="h-8 dark:hidden" src="https://rastreosat.github.io/{window.location.hostname}/logo_large.svg" alt="{window.location.hostname}">
                        <img class="h-8 hidden dark:block" src="https://rastreosat.github.io/{window.location.hostname}/logo_large_dark.svg" alt="{window.location.hostname}">
                    </div>
                    <div class="hidden md:block">
                        <div class="ml-10 flex items-baseline space-x-4">
                            {#each menuItems as item}
                            <a onclick="{() => headerClicked.set(item.url + '?t=' + new Date().getTime())}" href="{item.url}" class="{item.url === $page.url.pathname ? 'bg-primary text-white' : 'text-gray-400 hover:bg-gray-400 hover:text-white'}  rounded-md px-3 py-1 text-sm font-medium " aria-current="page">{item.value}</a>
                            {/each}
                        </div>
                    </div>
                </div>
                <div class="hidden md:block">
                    <div class="ml-4 flex items-center md:ml-6">
                        <button type="button" class="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span class="absolute -inset-1.5"></span>
                            <span class="sr-only">View notifications</span>
                            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                            </svg>
                        </button>
                        <!-- Profile dropdown -->
                        <div class="relative ml-3">
                            <div>
                                <button onclick="{menuVisible=!menuVisible}" type="button" class="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                                    <span class="absolute -inset-1.5"></span>
                                    <span class="sr-only">Open user menu</span>
                                    <img class="h-8 w-8 rounded-full  " src="https://ui-avatars.com/api/?name={
                                        data && data.session && data.session.name}&background={
                                        palette().tailwind.gray[800].replace('#','')}&color={
                                        palette().tailwind.gray[400].replace('#','')
                                        }" alt="">
                                </button>
                            </div>
                            {#if menuVisible}
                            <div onmouseleave="{() => (menuVisible=false)}" transition:fade={{ duration: 100 }} class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
                                {#each [
                                    {href: '/map/settings/user/' + data.session.id, name: 'Perfil'},
                                    {href: '/', name: 'Sair', onClick: logout}
                                ] as item }
                                <a onclick="{item.onClick}" href="{item.href}" onmouseenter="{() => (itemActive=item.name)}" class="{itemActive === item.name ? 'bg-gray-100' : ''} cursor-pointer block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1">{item.name}</a>
                                {/each}
                            </div>
                            {/if}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
    {/if}
    <main class="h-full">
        <div class="h-full relative">
            <a class="px-3 hidden lg:block border-solid border-2 absolute toggle bg-gray-100 text-gray-800 rounded-b-md cursor-pointer left-1/2"
                 onclick="{() => (showNav = !showNav)}">
                <div class="left-1/2 text-xs text-center">{showNav ? '▲' : '▼'}</div>
            </a>
            {@render children()}
        </div>
    </main>
</div>
