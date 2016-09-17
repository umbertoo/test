import React, { Component } from 'react';
import sprite from '../images/sheet_apple_32.png';
import map from 'lodash/map';

class Category extends Component {
    componentDidMount(){
        this.props.regCategory({elem:this.refs.elem},this.props.name);
    }
    render(){
        const {categories, name,regElem}=this.props;
        return (
            <div
              ref="elem"
              className="emoji-picker__category">
                <div className="emoji-picker__category-name">{name}</div>
                {map(categories[name],(e,i) =>
                    <div className="emoji-picker__item" key={i}
                      onClick={this.props.onSelect.bind(null,`:${e.short_name}:`)}
                >
                        <div
                          className="emoji-picker__icon"
                          style={{
                              backgroundPosition:`${e.sheet_x*2.5}% ${e.sheet_y*2.5}%`,
                              backgroundImage:`url(${sprite})`
                          }}
                />
                    </div>
                )}
            </div>);
        }
    }

    export default Category;
