<script lang="ts">
	import 'wired-elements/lib/wired-icon-button.js';
	import 'wired-elements/lib/wired-button.js';
	import '@material/mwc-icon/mwc-icon';
	import type {Bridge} from './Bridge';
	import {formatDate} from './formatDate';
	import {headerTestIds} from 'calendar-test-ids';

	const link = document.createElement('link');
	link.href = 'https://fonts.googleapis.com/css?family=Material+Icons&display=block';
	link.rel = 'stylesheet';
	document.head.appendChild(link);
	
	export let bridge: Bridge = {};
	let date = '';

	$: {
		if (bridge && bridge.interval) {
			date = formatDate(bridge.interval);
		}
	};
</script>

<header class="header" data-test-id={headerTestIds.root}>
	<div class="content">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<wired-button class="today-button" data-test-id={headerTestIds.todayButton} on:click={bridge.onTodayClick}>Today</wired-button>
		<div class="arrows">
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<wired-icon-button class="arrow arrow-left" data-test-id={headerTestIds.arrowLeft} on:click={bridge.onArrowLeftClick}>
				<mwc-icon>arrow_back</mwc-icon>
			</wired-icon-button>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<wired-icon-button class="arrow" data-test-id={headerTestIds.arrowRight} on:click={bridge.onArrowRightClick}>
				<mwc-icon>arrow_forward</mwc-icon>
			</wired-icon-button>
		</div>
		{#if date}
			<h6 class="date" data-test-id={headerTestIds.date}>{date}</h6>
		{/if}
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
