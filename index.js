

const url="https://mock-server2-azhb.onrender.com/masai";

window.onload = () =>{
    getData();
};

let getData = async()=>{
    let res = await fetch(url);
    res = await res.json();
    renderDom(res);
}

let addTodo = async () => {
    let task = document.getElementById("todo").value;

    let todo = {
        title: task,
        status: false,
        id: Date.now() + task,

    };

    let res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(todo),
        headers: {
            "Content-Type": "application/json"
        },
    });
    getData();
};
let el = (tag)=>{
    return document.createElement(tag);
}
let card = (todo)=>{
    let div=document.createElement("div");
    let h3=el("h3");
    let p=el("p");
    let delbtn=el("button");
    let togbtn=el("button");

    h3.innerText=todo.title;
    p.innerText=todo.status;
    delbtn.innerText="Delete";
    togbtn.innerText="Toggle";

    togbtn.onclick = () =>{
        toggle(todo.id);
    };
    delbtn.onclick = () =>{
        deleteTodo(todo.id);
    }

    div.append(h3,p,delbtn, togbtn);
    return div;
}
let renderDom = (data)=>{
    let cont=document.getElementById("container");
    cont.innerHTML=null;

    data.forEach((el)=>{
        let todo=card(el);
        cont.append(todo);
    });
};

let toggle = async (id) =>{
    //PUT --> for whole data
    //PATCH --> for particular point inside the data

    let res = await fetch(`${url}/${id}`);
    res = await res.json();

    //console.log(res);

    let data = {status: !res.status};

    await fetch(`${url}/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        },
    });
    getData();
}

let deleteTodo = async (id) => {

    await fetch(`${url}/${id}`, {
        method: "DELETE",
        
    });
    getData();
}
