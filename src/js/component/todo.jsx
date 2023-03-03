import React, { useEffect, useState } from "react";
import { TiDelete } from 'react-icons/ti';


const Todo = () => {



	useEffect(() => {
		getTodo();
	}, [])


	const getTodo = () => {
		const url = "https://assets.breatheco.de/apis/fake/todos/user/alejandroleortiz";
		const options = {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			//body: JSON.stringify(data),
		}
		fetch(url, options)
			.then(respuesta => {
				if (respuesta.status >= 200 && respuesta.status < 300) {
					console.log("La peticion se hizo correctamente");
					return respuesta.json();
				} else {
					console.log(`hubo un error en ${respuesta.status}`);
				};
			})
			.then(data => {
				console.log("Este es el body del request", data);
				setTodos(data); // guardar en el estado
			})
			.catch((error) => {
				console.log(error);
			});
	}


	const [inputValue, setInputValue] = useState("") // Definir el useState para el imput
	const [todos, setTodos] = useState({})           // Definir el Usestate para generar los li

	const generateTodo = (e) => { //evento para generar los todo
		e.preventDefault();       //Funcion para prevenir que se recargue la p[agina]
		setTodos([...todos, inputValue]); // Desplegamos o concatenamos otra forma seria setTodos(todos.concat([inputValue]))
		setInputValue(""); // Se genera el nuevo string dentro del array
	}

	return (
		<>
			<div className="container col-5">
				<h1 className="text-center">todos</h1>
				<ul className="p-0 mb-0">
					<li className="border">
						<form onSubmit={generateTodo}>
							<input
								value={inputValue}
								onChange={(event) => setInputValue(event.target.value)}
								type="text"
								placeholder="What do you need to do?"
							/>
						</form>
					</li>
					{/* {todos.map((t, i) => (
						<li className="border" key={i}>

							<div className="d-flex justify-content-between">
								<span>{t}</span>
								<TiDelete className="iconColor" onClick={() => setTodos(todos.filter((t, currentIndex) => i !== currentIndex))} />
							</div>
						</li>
					))} */}
				</ul>
				<div>{todos.length} item{todos.length === 1 ? '' : 's'} left</div>
			</div>
		</>
	);
};

export default Todo;

// <div>{todos.length} item{todos.length === 1 ? '' : 's'} left</div> agregamos una "s" en la palabra item cuando tengamos mas de un todo