let btn =[
    {name:'AC',type:1},
    {name:'DEL',type:6},
    {name:'+/-',type:7},
    {name:'/',type:3},
    {name:'7',type:4},
    {name:'8',type:4},
    {name:'9',type:4},
    {name:'*',type:3},
    {name:'4',type:4},
    {name:'5',type:4},
    {name:'6',type:4},
    {name:'-',type:3},
    {name:'1',type:4},
    {name:'2',type:4},
    {name:'3',type:4},
    {name:'+',type:3},
    {name:'%',type:2},
    {name:'.',type:4},
    {name:'0',type:4},
    {name:'=',type:5},
];

// 显示结果组件
class Screen extends React.Component{
    render(){
        return(
            <div className="screen">{this.props.data}</div>
        )
    }
}
// 按键组件
class Operator extends React.Component{
    render(){
        let el = this.props.data.map((v,i)=>(
            <li key={i} onClick={()=>this.props.number(v)} className="item">{v.name}</li>
        ))
        return (<div className="operator">{el}</div>)
    }
}

// 父组件
class Cal extends React.Component{
    constructor(){
        super();
        this.state={
            ScreenNum:0,
            first:'',
            last:'',
            sign:''   //定义符号，以符号是否存在，划分两个值
        }
        this.change = this.change.bind(this);
        this.processNumber = this.processNumber.bind(this);
        this.processO = this.processO.bind(this);
        this.processEqal = this.processEqal.bind(this);
        this.processAC = this.processAC.bind(this);
    }
    // 根据类型调用不同方法
    change(v){
        switch (v.type){
            case 1:
                this.processAC()    //清空
                break;
            case 3:
                this.processO(v.name)
                break;
            case 4:
                this.processNumber(v.name)
                break;
            case 5:
                this.processEqal()
                break;
        }
    }

    // 通过判断是否键入符号  划分第一个值和第二个值
    processNumber(num){
        if(!this.state.sign){   //如果没有键入符号
            let temp = this.state.first + num;
            this.setState({
                first:temp,
                ScreenNum:temp             // 将传入的值给到状态   并更新到屏幕显示
            })
        }else{
            // 如果键入符号
            this.setState({
                last:num,
                ScreenNum:num
            })
        }
    }

    // 键入运算符
    processO(num){
        this.setState({
        sign:num,
        ScreenNum:num
    })
    }

    // 运算符计算  前后两个数求值
    processEqal(){
        let result;
        let one = parseFloat(this.state.first);
        let two = parseFloat(this.state.last);
        switch (this.state.sign){
            case "+":
                result = one+two;
                break;
            case "-":
                result = one-two;
                break;
            case "*":
                result = one*two;
                break;
            case "/":
                result = one/two
                break;
        }

        this.setState({
            ScreenNum:result,
            first:'',
            last:'',
            sign:''
        })
    }

    // 清空显示
    processAC(){
        this.setState({
            ScreenNum:0,
            first:'',
            last:'',
            sign:''
        })
    }
    render(){
        return(
            <div className="cal">
                <Screen data={this.state.ScreenNum}/>  {/*传入显示数字*/}
                <Operator data={btn} number={this.change}/>   {/*传入点击事件函数*/}
            </div>
        )
    }
}

ReactDOM.render(<Cal/>, document.querySelector('#app'));