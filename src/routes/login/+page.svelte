<script>
    import '../../app.css'
    import {goto} from "$app/navigation";
    import {t} from '$lib/i18n'
    import {onMount} from "svelte";
    import {SvelteToast, toast} from '@zerodevx/svelte-toast'
    import theme from "../../theme/palette.js";

    const handleSubmit = (event) => {
        event.preventDefault();
        const fetchData = async () => {
            {
                const query = `email=${encodeURIComponent(email)}&password=${encodeURIComponent(password.value)}`;
                const response = await fetch('/api/session', {
                    method: 'POST',
                    body: new URLSearchParams(query),
                });
                if (response.ok) {
                    await goto('/')
                } else {
                    toast.push(t(response.statusText || response.status))
                }
            }
        }
        fetchData();
    };

    let email = $state('')
    let password = $state('')

    let openid = new URLSearchParams(window.location.search).has('openid')
    if (openid) {
        window.location.href = '/map/api/session/openid/auth'
    }

    let color = $state('#ea580c')
    onMount(async () => {
        try {
            const response = await fetch(`https://raw.githubusercontent.com/rastreosat/rastreosat.github.io/refs/heads/main/${window.location.hostname}/color.json`)
            if (response.ok) {
                color = await response.json()
            }
        } catch {/* empty */ }
    })

</script>
<style>
    :root {
        --toastContainerTop: auto;
        --toastContainerRight: auto;
        --toastContainerBottom: 8rem;
        --toastContainerLeft: calc(50vw - 8rem);
    }
</style>
<SvelteToast options={
{ reversed: true, intro: { y: 192 },
  theme: {
    // '--toastColor': 'red',
    '--toastBackground': theme(false, false).primary.main,
    '--toastBarBackground': color
  }
}} />
<div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8" style="{openid && 'display:none'}">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <img class="mx-auto w-full" src="https://rastreosat.github.io/{window.location.hostname}/logo_large.svg" alt="{window.location.hostname}">
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form class="space-y-6" onsubmit={handleSubmit}>
            <div>
                <label for="email" class="block text-sm/6 font-medium text-gray-900">Email</label>
                <div class="mt-2">
                    <input bind:value="{email}" id="email" name="email" type="text" autocomplete="email" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm/6">
                </div>
            </div>
            <div>
                <div class="flex items-center justify-between">
                    <label for="password" class="block text-sm/6 font-medium text-gray-900">{t('Password')}</label>
                    <div class="text-sm">
                        <a href="/login" style="{'color: ' + color}" class="font-semibold">{t('Esqueceu a senha?')}</a>
                    </div>
                </div>
                <div class="mt-2">
                    <input bind:this="{password}" id="password" name="password" type="password" autocomplete="current-password" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm/6">
                </div>
            </div>

            <div>
                <button type="submit" style="{'background: ' + color}" class="flex w-full justify-center rounded-md px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">Entrar</button>
            </div>
        </form>

        <!--p class="mt-10 text-center text-sm/6 text-gray-500">
            {t('Não é cliente?')}
            <a href="/login" class="font-semibold text-orange-600 hover:text-orange-500">{t('Experimente grátis durante 14 dias')}</a>
        </p-->
    </div>
</div>
