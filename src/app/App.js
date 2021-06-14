import React, { Component} from 'react';
class App extends Component {

    constructor() {
        super();
        this.state = {
            title: '',
            description: '',
            tasks: [],
            _id: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.addTask = this.addTask.bind(this);
    }

    componentDidMount(){
        this.fetchTasks();
    }

    fetchTasks(){
        fetch('/api/tasks')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.setState({tasks: data});
            }); 
    }

    addTask(e){
        if(this.state._id){
            fetch(`/api/tasks/${this.state._id}`,{
                method: 'PUT',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept':'application/json',
                    'Content-type':'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                M.toast({html: 'Task Update'});
                this.setState({title: '', description: '', _id: ''});
                this.fetchTasks();
            });
        }else {
        fetch('/api/tasks', {
            method: 'POST', 
            body: JSON.stringify(this.state),
            headers: {
                'Accept':'application/json',
                'Content-type':'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                M.toast({html: 'Task Saved'});
                this.setState({title: '', description: ''});
                this.fetchTasks();
            })
            .catch(err => console.error(err));
        }
        e.preventDefault();
    }

    deleteTask(id){
        if(confirm('Are you sure you want to delete it?')) { 
        fetch(`/api/tasks/${id}`,{
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type':'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                M.toast({html: 'Task Deleted'});
                this.fetchTasks();
            });
         }   
    }

    editTask(id){
        fetch(`/api/tasks/${id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({
                    title: data.title,
                    description: data.description,
                    _id: data._id
                })

            } );
    }

    handleChange(e){
        const {name, value} = e.target;
        this.setState({
            [name]: value
        });
    }

    render() {
        return (

            <div>{/* Navigation*/ }
                <nav className="light-blue darken-4">
                    <div className="container">
                        <a className="brand-logo" href="/">MERN Stack</a>
                        <ul className="left hide-on-med-and-down">
                        <li><a href="/">Link1</a></li>
                        <li><a href="/">Link2</a></li>
                        <li className="active" ><a href="/">Link3</a></li>



                        </ul>
                    </div>
                </nav>

                <div className="container">
                    <div className="row ">

                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.addTask}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name="title" onChange={this.handleChange} type="text" placeholder="Task Title" value={this.state.title}></input>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <textarea name="description" onChange={this.handleChange} placeholder="Task Title" className="materialize-textarea" value={this.state.description}></textarea>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn light-blue darken-4">Send</button>
                                    </form>

                                </div>
                    

                            </div>

                        
                        </div>

                        <div className="col s7">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.tasks.map(task => {
                                            return(
                                                <tr key={task._id}>
                                                    <td>{task.title}</td>
                                                    <td>{task.description}</td>
                                                    <td>
                                                        <button className="btn light-blue darken-4" onClick={()=> this.deleteTask(task._id)}> <i className="material-icons">delete</i>  Delete</button>
                                                        <button onClick={() => this.editTask(task._id)} className="btn light-blue darken-4" style={{margin: '4px'}}> <i className="material-icons">edit</i>  Edit</button>
                                                        
                                                    </td>
                                                </tr>
                                            )
                                        })

                                    }
                                </tbody>
                            </table>


                        </div>

                     </div>



                    </div>

                    


            </div>

        )
    }
}
export default App;