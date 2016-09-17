import React, { Component } from 'react';
import Item from './item';
import autoBind from 'react-autobind';
import uniq from 'lodash/uniq';
import sortBy from 'lodash/sortBy';
import map from 'lodash/map';
import reduce from 'lodash/reduce';
import forEach from 'lodash/forEach';
import keyBy from 'lodash/keyBy';
import sprite from '../images/sheet_apple_32.png';
import ScrollView from 'react-custom-scrollbars';
import shallowEqual from 'shallowequal';
import Category from './Category';
// import sprite from './images/sheet_twitter_32.png';


class List extends Component {
    constructor(props){
        super(props);
        autoBind(this);
        this.state={
            hover:false
        };
        this.catblocks={};
        this.heights={};
    }
    shouldComponentUpdate(nextProps, nextState){
        return !shallowEqual(nextProps,this.props)||!shallowEqual(nextState,this.state);
    }
    computeHeights(){
        // save positions to this.catblocks
        reduce(this.catblocks, (sum, block ,key) =>{
            this.catblocks[key].position = sum;
            return  block.elem.offsetHeight + sum;
        }, 0);
    }
    componentDidMount(){
        setTimeout(()=>{
            if(!this.state.hover){
                this.setState({
                    hover:true
                });
            }
        },1);
    }
    scrollHandler(e){
        let res = "";
        let prev =0;
        let stop=false;
        let prevKey= "";
        const scrollpos = this.scrollView.getScrollTop();
        forEach(this.props.categoriesOrder,(key,i)=>{
            if(!stop) {
                if(i!==0){
                    if(scrollpos >= prev && scrollpos < this.catblocks[key].position){
                        res=prevKey;
                        stop=true;
                    }else if(scrollpos>this.catblocks[this.props.categoriesOrder.slice(-1)[0]].position){
                        res=this.props.categoriesOrder.slice(-1)[0];
                        stop=true;
                    };
                }
                prevKey= key;
                prev = this.catblocks[key].position;
            }
        });
        // console.log(res);
        this.props.onScrollCategory(res);
    }
    scrollTo(key){
        console.log('scrollTo',key);
        scrollTo(this.scrollView.refs.view,this.catblocks[key].position+1, 300);
    }
    regCategory(c,name){
        this.catblocks[name]=c;
        if(Object.keys(this.catblocks).length ==this.props.categoriesOrder.length){
            this.computeHeights();
        }
    }
    render(){
        const {categories,categoriesOrder} = this.props;
        return (
            <ScrollView
              ref={c=>this.scrollView=c}
              onScroll={this.scrollHandler} style={{height:'262px'}}>
                <div className="emoji-picker__list">
                    {(!this.state.hover ? [categoriesOrder[0]] :categoriesOrder)
                        .map((key,i)=>{
                            return categories[key].length ?
                                <Category regCategory={this.regCategory} onSelect={this.props.onSelect} key={i} name={key} categories={categories}/>
                        :null;}
                        )
                    }
                </div>
            </ScrollView>
        );
    }
}

export default List;

function scrollTo(element, to, duration) {
    if (duration <= 0) return;
    var difference = to - element.scrollTop;
    var perTick = difference / duration * 10;

    setTimeout(()=> {
        element.scrollTop = element.scrollTop + perTick;
        if (element.scrollTop === to) return;
        scrollTo(element, to, duration - 10);
    }, 10);
}
