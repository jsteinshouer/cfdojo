<cfoutput>
<h1>Kata</h1>
<div class="list-group">
	<cfloop query="#prc.qKata#" index="item">	
		<a href="/index.cfm/#event.getCurrentModule()#/kata/#lcase(prc.qKata.id)#" class="list-group-item">
			<cfif prc.qKata.complete>
				<span class="badge"><span class="glyphicon glyphicon-ok" aria-hidden="true"></span></span>
			</cfif>
			<h4 class="list-group-item-heading">#prc.qKata.title#</h4>
			<p class="list-group-item-text">#prc.qKata.description#</p>
		</a>
	</cfloop>
</div>
</cfoutput>