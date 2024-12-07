function filterCSS() {
	const className = document.getElementById('class').value.trim().toLowerCase();
	const idName = document.getElementById('id').value.trim().toLowerCase();
	const element = document.getElementById('element').value.trim().toLowerCase();
	const property = document.getElementById('property').value.trim().toLowerCase();
	const value = document.getElementById('value').value.trim().toLowerCase();
	const input = document.getElementById('input').value;

	const lines = input.split('\n');
	let filteredCSS = '';

	let currentSelector = '';
	let currentCSS = '';

	lines.forEach((line) => {
		if (line.includes('{')) {
			currentSelector = line.substring(0, line.indexOf('{')).trim();
			currentCSS = '';
		} else if (line.includes('}')) {
			if (currentSelector && currentCSS && matchesFilter(currentSelector, currentCSS)) {
				filteredCSS += currentSelector + ' {\n' + currentCSS + '}\n';
			}
			currentSelector = '';
			currentCSS = '';
		} else {
			currentCSS += line + '\n';
		}
	});

	document.getElementById('output').textContent = filteredCSS;
}

function resetFilter() {
	document.getElementById('class').value = '';
	document.getElementById('id').value = '';
	document.getElementById('element').value = '';
	document.getElementById('property').value = '';
	document.getElementById('value').value = '';
	document.getElementById('output').value = '';
}

function resetTextAreas() {
	document.getElementById('input').value = '';
	document.getElementById('output').value = '';
}

function matchesFilter(selector, css) {
	const className = document.getElementById('class').value.trim().toLowerCase();
	const idName = document.getElementById('id').value.trim().toLowerCase();
	const element = document.getElementById('element').value.trim().toLowerCase();
	const property = document.getElementById('property').value.trim().toLowerCase();
	const value = document.getElementById('value').value.trim().toLowerCase();

	if (className && !selector.includes(`.${className}`)) {
		return false;
	}

	if (idName && !selector.includes(`#${idName}`)) {
		return false;
	}

	if (element && !selector.startsWith(element)) {
		return false;
	}

	if (property || value) {
		const lines = css.split('\n');
		let hasMatch = false;

		lines.forEach((line) => {
			if (line.includes(':')) {
				const [prop, val] = line.split(':');
				const cssProp = prop.trim().toLowerCase();
				const cssVal = val.trim().toLowerCase();

				if (
					(property && !cssProp.includes(property)) ||
					(value && !cssVal.includes(value))
				) {
					return;
				}

				hasMatch = true;
			}
		});

		return hasMatch;
	}

	return true;
}

function beautifyCSS() {
	const input = document.getElementById('input').value;
	const beautifiedCSS = css_beautify(input);

	document.getElementById('output').textContent = beautifiedCSS;
}

function minifyCSS() {
	const input = document.getElementById('input').value;
	const minifiedCSS = input.replace(/\s+/g, '');

	document.getElementById('output').textContent = minifiedCSS;
}

function copyOutput() {
	const output = document.getElementById('output');
	output.select();
	output.setSelectionRange(0, 99999); // For mobile devices

	document.execCommand('copy');
}

function swapCode() {
	const input = document.getElementById('input').value;
	const output = document.getElementById('output').value;
	document.getElementById('input').value = output;
	document.getElementById('output').value = input;
}