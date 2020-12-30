

function addline(){
    if(n<9){
        n+=1;
    }else{
        alert('Maximum = '+n);
    }

    redoTable(m,n);
    
}

function removeLine(){
    if(n>3){
        n-=1;
    }else{
        alert('Minimum = '+n);
    }

    redoTable(m,n);
}

function addColumn(){
    if(m<9){
        m+=1;
    }else{
        alert('Maximum = '+m);
    }

    redoTable(m,n);
}

function removeColumn(){
    if(m>3){
        m-=1;
    }else{
        alert('Minimum = '+m);
    }

    redoTable(m,n);
}

function redoTable(m,n){
    var matrixContainer = document.getElementById('matrixContainer');
    removeTable();    
    makeNewTable(m,n);    

}

function makeNewTable(m, n){
    
    count=0;
    document.getElementById("counter").innerHTML="count ="+count;

    matrix = initiateMatrix(m,n);
    var table = document.createElement('table');
    table.id = "matrix";
    table.className = "table table-responsive-sm table-dark table-bordered mb-5";

    var firstLine = makeFirstLine();
    table.appendChild(firstLine);

    for (var j=1; j<n-1; j++){
        var line = document.createElement('tr');
        var td = document.createElement('td');
        var input = document.createElement('input');
        input.id = "cell_0_"+j;
        input.className="form-control form-control-sm";
        input.type = "text";
        input.value=entierAleatoire(-100, 100);
        td.appendChild(input);
        line.appendChild(td);

        for(var i=1; i<m-1; i++){
            var td = document.createElement('td');
            var div = document.createElement('div');
            div.id = "cell_"+i+"_"+j;
            div.value=0;
            td.appendChild(div);
            line.appendChild(td);
        }

        var td = document.createElement('td');
        var input = document.createElement('input');
        input.id = "cell_"+(m-1)+"_"+j;
        input.className="form-control form-control-sm";
        input.type = "text";
        input.value=entierAleatoire(-100, 100);
        td.appendChild(input);
        line.appendChild(td);

        table.appendChild(line);

    }

    var lastLine = makeLastLine();
    table.appendChild(lastLine);

    matrixContainer.appendChild(table);

}

function removeTable(){
    
    var matrixElement = document.getElementById('matrix');
    matrixContainer.removeChild(matrixElement);
}

function makeFirstLine(){
    var firstLine = document.createElement('tr');
    var cell_0_0 = document.createElement('td');
    firstLine.appendChild(cell_0_0);

    for(var i=1; i<m-1; i++){
        var td = document.createElement('td');
        var input = document.createElement('input');
        input.id = "cell_"+i+"_0";
        input.className="form-control form-control-sm";
        input.type = "text";
        input.value=entierAleatoire(-100, 100);
        td.appendChild(input);
        firstLine.appendChild(td);
    }

    var cell_m_0 = document.createElement('td');
    firstLine.appendChild(cell_m_0);
    return firstLine;
}

function makeLastLine(){
    var lastLine = document.createElement('tr');
    var cell_0_n = document.createElement('td');
    lastLine.appendChild(cell_0_n);

    for(var i=1; i<m-1; i++){
        var td = document.createElement('td');
        var input = document.createElement('input');
        input.id = "cell_"+(i)+"_"+(n-1);
        input.className="form-control form-control-sm";
        input.type = "text";
        input.value=entierAleatoire(-100, 100);
        td.appendChild(input);
        lastLine.appendChild(td);
    }

    var cell_m_n = document.createElement('td');
    lastLine.appendChild(cell_m_n);
    return lastLine;
}

function solve(){

        freezeInputs();
        matrix = makeMatrix();
        count+=1;
        document.getElementById("counter").innerHTML="count ="+count;
        calculate(matrix);
}

function freezeInputs(){
    for(var i=1; i<m-1; i++){        
        var input = document.getElementById("cell_"+i+"_0");
        input.disabled="disabled";
    }

    for (var j=1; j<n-1; j++){
        var input = document.getElementById("cell_0_"+j);
        input.disabled="disabled";

        var input = document.getElementById("cell_"+(m-1)+"_"+j);
        input.disabled="disabled";

    }

    for(var i=1; i<m-1; i++){
        var input = document.getElementById("cell_"+(i)+"_"+(n-1));
        input.disabled="disabled";

    }



}

function initiateMatrix(b, c){
    matrix=new Array(b);
    for(var i=0; i<b; i++){
        matrix[i]=new Array(c);
        for(var j=0; j<c; j++){
            matrix[i][j]=0;
        }
    }
    
    return matrix;

}

function makeMatrix(){

    for(var i=1; i<m-1; i++){
        var cell = document.getElementById('cell_'+i+'_0');
        if(isNaN(cell.value)){
            alert('At least one cell is not a number.');
            break;
        }else{
            matrix[i][0]=cell.value;
        }
    }

    for (var j=1; j<n-1; j++){

        var cell = document.getElementById('cell_0_'+j);
        if(isNaN(cell.value)){
            alert('At least one cell is not a number.');
            break;
        }else{
            matrix[0][j]=cell.value;
        }

        var cell2 = document.getElementById('cell_'+(m-1)+'_'+j);
        if(isNaN(cell2.value)){
            alert('At least one cell is not a number.');
            break;
        }else{
            matrix[m-1][j]=cell2.value;
        }   
    }

    for(var i=1; i<m-1; i++){
        var cell = document.getElementById('cell_'+i+'_'+(n-1));
            if(isNaN(cell.value)){
                alert('At least one cell is not a number.');
                break;
            }else{
                matrix[i][n-1]=cell.value;
            }
    }

    return matrix;
    
}

function calculate(matrix){   
    
    for (var j=1; j<n-1; j++){

        for(var i=1; i<m-1; i++){
            var a = (matrix[i-1][j]);
            var b = (matrix[i+1][j]);
            var c = (matrix[i][j+1]);
            var d = (matrix[i][j-1]);
            var res = (a/4)+(b/4)+(c/4)+(d/4);
            matrix[i][j]=Math.round(res*100)/100;
            document.getElementById('cell_'+i+'_'+j).innerHTML=matrix[i][j]; 
           
        }
    
    }
    

}

function consoleMatrix(matrix){
    for (var j=0; j<n; j++){
        for (var i=0; i<m; i++){
            console.log('cell('+i+', '+j+') = '+matrix[i][j]);
        }
    
    }
    console.log('***********************');
}

function entierAleatoire(min, max)
{
 return Math.floor(Math.random() * (max - min + 1)) + min;
}
