﻿<cfoutput>

<h1>Training Modules</h1>
<div class="list-group">
	<cfloop list="#structKeyList(prc.modules)#" index="key">	
		<cfif !listFindNoCase("cbdebugger,about,cfdojo-dashboard-client",key)>
			<a href="/index.cfm/#key#/" class="list-group-item">
				<p class="list-group-item-text pull-right"><em>#prc.modules[key].author#</em></p>
				<h4 class="list-group-item-heading">#prc.modules[key].title#</h4>
				<p class="list-group-item-text">#prc.modules[key].description#</p>
			</a>
		</cfif>
	</cfloop>
</div>

</cfoutput>