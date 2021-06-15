import React from 'react';
import './Form.css';

class Form extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            users: undefined
        };
    }
    fetchUsers() {
        const opts = {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
        };
        fetch(`http://localhost:8080/users`, opts)
            .then(res => res.json().then((json) => {
                if (json.status === 200) {
                    this.state.users = json.data;
                    this.forceUpdate();
                }
            }))
            .catch((error) => {
                alert(error);
            });
    }
    componentDidMount() {
        this.fetchUsers();
    }
    onChange(event) {
        this.setState({
            name: event.target.value
        });
    }
    onSubmit(event) {
        event.preventDefault();
        const opts = {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: this.state.name })
        };
        fetch('http://localhost:8080/adduser', opts)
            .then(res => res.json().then((json) => {
                if (json.status === 200) {
                    console.log(json);
                    this.fetchUsers();
                }
            }))
            .catch((error) => {
                alert(error);
            });
    }
    render() {
        return (
            <div className="users">
                <div className="userlist">
                    <p>Users:</p>
                    <ul>
                        {this.state.users && this.state.users.map((i) => {
                            return (
                                <li key={i._id}>{i.name} ({i._id})</li>
                            );
                        })}
                    </ul>
                </div>
                <form className="userform-form">
                    <label>Add user:</label>
                    <input type="text" value={this.state.name} onChange={this.onChange.bind(this)} />
                    <button onClick={this.onSubmit.bind(this)} type="submit">Create</button>
                </form>
            </div>
        );
    }
}

export default Form;
