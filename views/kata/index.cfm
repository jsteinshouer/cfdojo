<cfsilent>
	<cfset html.addAsset("/includes/ace/ace.js")>
	<cfset html.addAsset("/includes/js/mousetrap.min.js")>
	<cfset html.addAsset("/includes/js/kata.js")>
</cfsilent>

<cfoutput>
<div class="row">
	<div class="col-md-6">
		<h3>#prc.kata.getTitle()#</h3>
		<ul id="myTabs" class="nav nav-tabs">
			<li id="instructions-tab" class="active"><a href="##instructions" data-toggle="tab">Instructions</a></li>
			<li id="output-tab"><a href="##test-output" data-toggle="tab">Output</a></li>
		</ul>
		<div class="tab-content">
			<div class="tab-pane fade active in" id="instructions">
				<div class="margin10">
					#renderView(view=prc.kata.getInstruction().getView(),module=prc.kata.getInstruction().getModule())#
				</div>
			</div>
			<div class="tab-pane fade" id="test-output">
				<div class="loading margin10 hidden">Waiting for results...</div>
				<div class="results margin10">
					<p class="text-danger hidden"></p>
					<div class="panel panel-success hidden">
						<div class="panel-heading">
						<h3 class="panel-title">Passed <span class="badge"></span></h3>
						</div>
						<div class="panel-body"></div>
					</div>
					<div class="panel panel-danger hidden">
						<div class="panel-heading">
						<h3 class="panel-title">Failed <span class="badge"></span></h3>
						</div>
						<div class="panel-body"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="col-md-6">
		<div class="panel panel-default panel-editor">
			<div class="panel-heading">#prc.kata.getSolution().getFileName()# <span class="glyphicon glyphicon-fullscreen pull-right" data-target="editor" aria-hidden="true"></span></div>
			<div class="panel-body">
				<div id="myeditor-container"><pre id="editor" class="myeditor">#htmlEditFormat(prc.kata.getSolution().getContent())#</pre></div>
			</div>
		</div>
		
		<div class="panel panel-default panel-editor">
			<div class="panel-heading">#prc.kata.getUserTests().getFileName()# <span class="glyphicon glyphicon-fullscreen pull-right" data-target="test" aria-hidden="true"></span></div>
			<div class="panel-body">
				<div class="myeditor-container"><pre id="test" class="myeditor">#prc.kata.getUserTests().getContent()#</pre></div>
			</div>
		</div>
		<button class="btn btn-success run-tests">Run Tests</button>
		<button class="btn btn-success submit-solution">Submit</button>
		<cfif structKeyExists(prc, "nextUrl")>
			<a class="btn btn-default next" href="#prc.nextUrl#">Next Challenge</a>
		</cfif>
	</div>
</div>

<div class="modal fade complete-modal" tabindex="-1" role="dialog">
	<div class="modal-dialog modal-sm">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title">Challenge Complete <span class="glyphicon glyphicon-thumbs-up" aria-hidden="true" style="margin-left: 10px"></span></h4>
			</div>
			<div class="modal-body">
			<p>Nice Work! All tests passed.</p>
			</div>
			<div class="modal-footer">
			<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
			<cfif structKeyExists(prc, "nextUrl")>
				<a class="btn btn-success" href="#prc.nextUrl#">Next Challenge</a>
			</cfif>
			</div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal-dialog -->
</div><!-- /.modal -->
</cfoutput>