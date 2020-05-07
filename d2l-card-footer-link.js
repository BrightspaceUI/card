/**
`d2l-card-footer-link`
Polymer-based web component for links in card footers

@demo demo/d2l-card-footer-link.html
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '@polymer/polymer/polymer-legacy.js';

import 'd2l-colors/d2l-colors.js';
import 'fastdom/fastdom.js';
import 'd2l-icons/d2l-icon.js';
import 'd2l-link/d2l-link-behavior.js';
import 'd2l-offscreen/d2l-offscreen-shared-styles.js';
import 'd2l-polymer-behaviors/d2l-focusable-behavior.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { dom } from '@polymer/polymer/lib/legacy/polymer.dom.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="d2l-card-footer-link">

	<template strip-whitespace="">
		<style include="d2l-offscreen-shared-styles">
			:host {
				display: inline-block;
				left: -0.6rem;
				margin-right: 0.3rem;
				position: relative;
			}
			:host[hidden] {
				display: none;
			}
			:host(:dir(rtl)) {
				left: auto;
				margin-left: 0.3rem;
				margin-right: 0;
				right: -0.6rem;
			}
			.d2l-card-footer-link-content {
				display: inline-block;
				line-height: 0;
				padding: 0.6rem;
				position: relative;
				text-align: center;
			}
			a.d2l-focusable {
				box-sizing: border-box;
				display: inline-block;
				height: 100%;
				position: absolute;
				outline: none;

				width: 100%;
				z-index: 1;
			}
			a.d2l-focusable[href]:focus + .d2l-card-footer-link-content > d2l-icon,
			a.d2l-focusable[href]:hover + .d2l-card-footer-link-content > d2l-icon {
				color: var(--d2l-color-celestine);
			}
			d2l-icon {
				height: 0.9rem;
				width: 0.9rem;
			}
			.d2l-card-footer-link-text {
				@apply --d2l-offscreen;
			}
			:host(:dir(rtl)) .d2l-card-footer-link-text {
				@apply --d2l-offscreen-rtl
			}

			.d2l-card-footer-link-secondary-text {
				box-shadow: 0 0 0 1px white;
				box-sizing: content-box;
				display: inline-block;
				font-size: 0.55rem;
				font-weight: 400;
				line-height: 100%;
				padding: 2px;
			}

			:host([secondary-text-type="box"]) .d2l-card-footer-link-secondary-text {
				background-color: white;
				border: 2px solid var(--d2l-card-footer-link-color, var(--d2l-color-carnelian));
				border-radius: 0.25rem;
				color: var(--d2l-color-ferrite);
				position: absolute;
				min-width: 0.75rem;
				right: 0;
				top: 0;
			}

			.d2l-card-footer-link-secondary-text-container {
				position: absolute;
				right: 0;
				top: 0;
			}

			:host([secondary-text-type="circle"]) .d2l-card-footer-link-secondary-text-container {
				right: 1rem;
				width: 1px;
			}

			:host([secondary-text-type="circle"]) .d2l-card-footer-link-secondary-text {
				border: 2px solid var(--d2l-card-footer-link-background-color, var(--d2l-color-carnelian));
				background-color: var(--d2l-card-footer-link-background-color, var(--d2l-color-carnelian));
				color: var(--d2l-card-footer-link-color, white);
				border-radius: 0.75rem;
				min-width: 0.5rem;
				padding: 2px;
				position: relative;
			}

			:host([secondary-text-type="box"]) :host(:dir(rtl)) .d2l-card-footer-link-secondary-text {
				left: 0;
				right: auto;
			}

			:host([secondary-text-type="circle"]) :host(:dir(rtl)) .d2l-card-footer-link-secondary-text-container {
				left: 1rem;
				right: auto;
			}

			[hidden].d2l-card-footer-link-secondary-text {
				display: none;
			}
		</style>
		<a class="d2l-focusable" download$="[[download]]" href$="[[href]]" hreflang="[[hreflang]]" rel="[[rel]]" target="[[target]]" type="[[type]]">
			<span class="d2l-card-footer-link-text">[[text]]</span>
		</a>
		<div class="d2l-card-footer-link-content">
			<d2l-icon icon="[[icon]]"></d2l-icon>
			<div class="d2l-card-footer-link-secondary-text-container">
				<div class="d2l-card-footer-link-secondary-text" aria-hidden="true" hidden="">[[secondaryText]]</div>
			</div>
		</div>
	</template>



</dom-module>`;

document.head.appendChild($_documentContainer.content);
Polymer({
	is: 'd2l-card-footer-link',

	behaviors: [
		D2L.PolymerBehaviors.Link.Behavior,
		D2L.PolymerBehaviors.FocusableBehavior
	],

	properties: {

		/**
		 * Name of preset icon (ex. [iconset-name:icon-id]) (required).
		 */
		icon: {
			type: String,
			reflectToAttribute: true
		},

		/**
		 * Accessible text for the link (not visible, gets announced when user focuses).
		 */
		text: {
			type: String,
			reflectToAttribute: true
		},
		/**
		 * The styling you want for your secondary text, options are 'box' and 'circle'
		 */
		secondaryTextType: {
			type: String,
			reflectToAttribute: true,
			value: 'box',
		},
		/**
		 * Secondary text to be display as a superscript on the icon.
		 */
		secondaryText: {
			type: String,
			observer: '_handleSecondaryText',
			reflectToAttribute: true
		}

	},

	_handleSecondaryText: function(newValue, oldValue) {
		var elem = dom(this.root).querySelector('.d2l-card-footer-link-secondary-text');
		if (newValue && newValue.length > 0) {
			fastdom.mutate(function() {
				elem.removeAttribute('hidden');
			});
		} else if (oldValue) {
			fastdom.mutate(function() {
				elem.setAttribute('hidden', 'hidden');
			});
		}
	}

});
