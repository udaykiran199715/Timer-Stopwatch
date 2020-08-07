import React from 'react'

class Mount extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            count: '',
            date: new Date(),
            value: '',
            flag: false
        }
        console.log("constructor is called")
    }

    componentDidMount(){
        console.log('componentDidMount called')

        this.timerId= setInterval(()=> {
            // this.setState({
            //     count: this.state.count + 1

            // })

            // this.handleTick()
            if(this.state.flag === true) {
            this.setState({

                count: this.state.count + 1
            })
        }


        },1000)
    }
    componentDidUpdate() {
        console.log('componentDidUpdate called')
    }
    componentWillUnmount() {
        clearInterval(this.timerId)
        console.log("componentWillUnmount called")
    }
   handleTick = ()=> { // this.handleTick()
       this.setState({
           date: new Date()
       })
   }

   handleChange = (e)=> {
       this.setState({
           value: Number(e.target.value)
       })
   }

   handleClick = () => {
       this.setState({
           count: this.state.value, flag: true
       })
   }
    render() {
        console.log('render method called')
        return (
            <div>
                {/* {this.state.count} */}
                {/* <button onClick={()=> this.setState({
                    count: this.state.count + 1
                })}>
                     Add
                </button> */}

            {/* <h3>It is {this.state.date.toLocaleTimeString()}</h3> */}

            <input value={this.state.value} onChange={this.handleChange} placeholder="0"/>
            <h2>{this.state.count}</h2>
            <button onClick={this.handleClick}>
                 Add
            </button>




            </div>
        )
    }
}

export default Mount