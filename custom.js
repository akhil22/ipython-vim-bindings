require([
  'nbextensions/vim_binding/vim_binding',
  'codemirror/addon/search/search',
  'codemirror/addon/search/searchcursor',
  'codemirror/addon/search/jump-to-line',
  'base/js/namespace',
  'notebook/js/cell'
], function(ns){
   CodeMirror.Vim.map(';m','<Esc>/', 'insert');
   CodeMirror.Vim.defineAction('Hello', function(cm){
     var head = cm.getCursor();
     CodeMirror.Vim.handleKey(cm,'<Esc>');
     CodeMirror.Vim.mapCommand("akhil","action","Hello",{},{ "context": "insert" });
   });
   CodeMirror.Vim.defineAction('[i]<C-h>', function(cm) {
    var head = cm.getCursor();
    CodeMirror.Vim.handleKey(cm, '<Esc>');
    if (head.ch <= 1) {
      CodeMirror.Vim.handleKey(cm, 'i');
    } else {
      CodeMirror.Vim.handleKey(cm, 'h');
      CodeMirror.Vim.handleKey(cm, 'a');
    }
   });
  CodeMirror.Vim.defineAction('latex-summation', function(cm) {
    var head = cm.getCursor();
    var doc = cm.getDoc();
    if(islatex(cm)){
    doc.replaceRange('\sum_{<++>}^{<++>}{<++>}',head);
    CodeMirror.Vim.handleKey(cm, '<Esc>');
    CodeMirror.Vim.handleKey(cm, '3F<');
    CodeMirror.Vim.handleKey(cm, 'c');
    CodeMirror.Vim.handleKey(cm, '4l');
    }
   else{
     doc.replaceRange(';s',head)
   }
  });
  function islatex(cm){

   var latexsearch = cm.getSearchCursor("%%latex", 0);
   var isnext = latexsearch.findNext()
   return isnext
  }
  CodeMirror.Vim.defineAction('move_next', function(cm) {
  //  CodeMirror.Vim.handleKey(cm, '/');
//   var ccell = Jupyter.notebook.get_selected_cell();
 //  var head = cm.getCursor();
  // var latexsearch = cm.getSearchCursor("%%latex", head);
 //  latexsearch.findNext()
  // console.log(latexsearch)
   var head = cm.getCursor();
   var head2 = cm.getSearchCursor("<\+\+>",head);
   var isnext = head2.findNext();
   var doc = cm.getDoc();
   if(isnext){
    doc.setCursor(head2.from())
    head2.replace('');
   }
   else{
     doc.replaceRange(';j',head)
   }
    // find my cell element
    // which cell is it?
    // get the cell object
    //  var str = cm.getTextArea();
  // doc.replaceRange(' ', head2.from());
   // CodeMirror.Vim.handleKey(cm, '/<\+\+><CR>');
  //  CodeMirror.Vim.handleKey(cm, '/');
    //CodeMirror.Vim.handleKey(cm, 'c');
 // CodeMirror.Vim.handleKey(cm, '4l');
  });
  CodeMirror.Vim.mapCommand("<C-h>", "action", "[i]<C-h>", {}, { "context": "insert" });
  CodeMirror.Vim.mapCommand(";s", "action", "latex-summation", {}, { "context": "insert" });
  CodeMirror.Vim.mapCommand(";j", "action", "move_next", {}, { "context": "insert" });

   console.log("its executing atleast this as well again");
});
