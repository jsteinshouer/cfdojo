﻿<cfoutput>#html.doctype()#<html lang="en"><head>	<meta charset="utf-8">	<title>cfdojo</title>	<!---Base URL --->	<!--- <base href="#getSetting("HTMLBaseURL")#" /> --->	<!---css --->	<link href="/includes/css/bootstrap.min.css" rel="stylesheet">	<link href="/includes/prism/prism.css" rel="stylesheet">	<link href="/includes/css/styles.css" rel="stylesheet">	<!---js --->    <script src="/includes/js/jquery.js"></script>	<script src="/includes/js/bootstrap.min.js"></script>	<script src="/includes/prism/prism.js"></script></head><body>	<ul class="nav nav-pills" style="margin-left: 14px; margin-bottom: 5px">		<li role="presentation"><a href="/"><span class="glyphicon glyphicon-home" aria-hidden="true"></span></a></li>		<li role="presentation"><a href="/index.cfm/about"><span class="glyphicon glyphicon-question-sign" aria-hidden="true"></span></a></li>		<!--- <li role="presentation"><a href="##"><span class="glyphicon glyphicon-search" aria-hidden="true"></span></a></li> --->		<!--- <li class="dropdown">			<a href="##" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><span class="glyphicon glyphicon-blackboard" aria-hidden="true"><!---  <span class="caret"></span> ---></a>			<ul class="dropdown-menu">			<li><a href="/index.cfm/about/">Introduction</a></li>			<cfloop list="#structKeyList(prc.modules)#" index="key">					<cfif !listFindNoCase("cbdebugger,about",key)>					<li><a href="/index.cfm/#key#/" class="list-group-item">#prc.modules[key].title#</a></li>				</cfif>			</cfloop>			</ul>		</li> --->		<cfif structKeyExists(prc, "qKata") and prc.qKata.recordCount>			<li class="dropdown">				<a href="##" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><span class="glyphicon glyphicon-list" aria-hidden="true"><!---  <span class="caret"></span> ---></a>				<ul class="dropdown-menu">				<cfloop query="#prc.qKata#" index="item">				<li>						<a href="/index.cfm/#event.getCurrentModule()#/kata/#lcase(prc.qKata.id)#">						#prc.qKata.title#						<cfif prc.qKata.complete>							<span class="badge pull-right"><span class="glyphicon glyphicon-ok" aria-hidden="true"></span></span>						</cfif>					</a>				</li>				</cfloop>				</ul>			</li>		</cfif>		<cfif prc.dashboardEnabled>			#renderView(view="menu",module="cfdojo-dashboard-client")#		</cfif>	</ul>	<!---Container And Views --->	<div class="container-fluid">#renderView()#</div></body></html></cfoutput>