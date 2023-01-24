<script lang="ts">
	import 'wired-elements/lib/wired-button.js';
	import 'wired-elements/lib/wired-icon-button.js'
	import '@material/mwc-icon/mwc-icon';

	import {formatDate} from './formatDate';

	const link = document.createElement('link');
	link.href = 'https://fonts.googleapis.com/css?family=Material+Icons&display=block';
	link.rel = 'stylesheet';
	document.head.appendChild(link);

	let header: HTMLElement;

	const dispatch = (name: string, data: any = {}) => {
		header.dispatchEvent(new CustomEvent(name, data));
	};

	const handleTodayClick = () => {
		dispatch('header:today-click');
	};
	const handleArrowLeftClick = () => {
		dispatch('header:arrow-left-click');
	};
	const handleArrowRightClick = () => {
		dispatch('header:arrow-right-click');
	};

	let date = formatDate({start: new Date(), end: new Date()});
</script>

<header class="header" bind:this={header}>
	<div class="content">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<wired-button class="today-button" on:click={handleTodayClick}>Today</wired-button>
		<div class="arrows">
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<wired-icon-button class="arrow arrow-left" on:click={handleArrowLeftClick}>
				<mwc-icon>arrow_back</mwc-icon>
			</wired-icon-button>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<wired-icon-button class="arrow" on:click={handleArrowRightClick}>
				<mwc-icon>arrow_forward</mwc-icon>
			</wired-icon-button>
		</div>
		<h6 class="date">{date}</h6>
	</div>
	<wired-divider class="divider"></wired-divider>
</header>

<style>
	:root {
		--margin-right: 20px;
	}

	.header {
		height: 52px;
		width: 100%;
		display: flex;
		flex-direction: column;
	}

	.content {
		display: flex;
		max-height: 52px;
		padding: 8px 20px;
		box-sizing: border-box;
		align-items: center;
	}

	.today-button {
		margin-right: var(--margin-right);
	}

	.arrows {
		margin-right: var(--margin-right);
	}

	.arrow {
		--wired-icon-size: 18px;
		display: inline-block;
	}

	.arrow-left {
		margin-right: 10px;
	}

	.date {
		font-size: 24px;
		font-weight: 700;
	}
</style>
