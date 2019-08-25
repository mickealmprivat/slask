<script>
	export let name;
</script>

<link href="https://fonts.googleapis.com/css?family=Lato:100,100i,300,300i,400,400i,700,700i&display=swap" rel="stylesheet"> 
<style lang="less">
	@import url("./node_modules/pam-css/dist/less/pam.less");
	@import url("./variables.less");

	:global(body) {
		font-family: 'Lato', sans-serif;
		padding: 0;
	}


    nav {
        display: flex;
		flex-direction: row;
		max-width: 720px;
		margin: 0 auto @space-40;
		padding: @space-16 0;
	}
	
	.logo-container { 
		flex-grow: 0;
		max-width: 50px; 
	}
	.link-container { 
		flex-grow: 1;
		text-align: right; 

		ul { float: right; }
		li[pam-Menu-Item] { margin-left: @space-16; }
	}
	
	.main-content {
		max-width: 720px;
		margin: 0 auto;
	}

	hgroup {
		background: #fdfcfc;
		display: block;
		position: relative;

		h1,h2,h3,h4 { margin: 0; }
		h2 { font-weight: 400; }
		h3 { font-weight: 300; }

		&::before {
			border: 2px solid @cyan;
			content: " ";
			background: green url('Images/mrg-logo-shield.png') center center no-repeat;
			border-radius: 100%;
			position: absolute;
			top: 16px;
			left: 16px;
			width: 50px;
			height: 50px;
		}
	}
</style>


<nav>
    <div class="logo-container nav_flex-container">
        <svg data-name="Layer 1" id="Logo" class="logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 288.57 288.57"><path d="M60 103.07l31.25 31.25 42.43-42.42L41.78 0H0v225.58l60-60v-62.51zM246.79 0L0 246.79v41.78h43.07l185.5-185.5v185.5h60V0h-41.78z"/></svg>
    </div>
    <div pam-Menu class="link-container">
        <ul pam-Menu-List>
            <li pam-Menu-Item><a href="/">Design</a></li>
            <li pam-Menu-Item><a href="/">Photography</a></li>
            <li pam-Menu-Item><a href="/">About</a></li>
            <li pam-Menu-Item><a href="/">LinkedIn</a></li>
        </ul>
    </div>
</nav>

<div class="main-content">
	<hgroup>
		<h2>Case study</h2>
		<h1>Mr Green - Swedish deposit limits</h1>
		<h3>2019</h3>
	</hgroup>

	<section>
		<h1>Problem description</h1>
	</section>
</div>