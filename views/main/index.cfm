<cfoutput>

<h1>Training Modules</h1>
<div class="list-group">
	<cfloop list="#structKeyList(prc.modules)#" index="key">	
		<cfif !listFindNoCase("cbdebugger,about",key)>
			<a href="/index.cfm/#key#/" class="list-group-item">
			<h4 class="list-group-item-heading">#prc.modules[key].title#</h4>
			<p class="list-group-item-text">#prc.modules[key].description#</p>
			</a>
		</cfif>
	</cfloop>
</div>

</cfoutput>