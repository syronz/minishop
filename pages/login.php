<?php
session_start();
ini_set('display_errors', 'On');
// require_once '../base.php';

// echo (dirname(dirname(__FILE__)));

// dsh($_SESSION);

?>
<div class="col-xs-12 col-md-12" ng-init="doLogout()">
	<ol class="breadcrumb">
		<li><a href="#">{{l('home')}}</a></li>
		<li class="active"><a>{{l('login')}}</a></li>
	</ol>
	<form class="form-signin" ng-submit="doLogin()">
	<h2 class="form-signin-heading">{{l('pleaseSignIn')}}</h2>
		<label for="inputUsername" class="sr-only"></label>
		<input type="text" id="inputUsername" class="form-control" placeholder="username" ng-model="loginInfo.username" required autofocus>
		<br>
		<label for="inputPassword" class="sr-only"></label>
		<input type="password" id="inputPassword" class="form-control" placeholder="password" ng-model="loginInfo.password" required>
		<div class="checkbox">
			<!-- <label>
				<input type="checkbox" value="remember-me"> {{l('rememberMe')}} 
			</label> -->
		</div>
		<button class="btn btn-lg btn-primary btn-block" type="submit">{{l('signIn')}}</button>
	</form>
</div>
