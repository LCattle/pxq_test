import React, { Component, PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import pureRender from 'pure-render-decorator';
import { is, fromJS } from 'immutable';
import { Tool } from '../../config/Tool';
import template from './template';
export { template } 


export class Header extends Component {
	contructor(props, context){
		super(props, context);
		this.state = {
			showHide: 'none'
		}
		this.showNav = () => {
			if (this.state.showHide === 'block') {
				this.setState({showHide: 'none'})
			}else{
				this.setState({showHide: 'block'})
			}
		}
	}

	shouldComponentUpdate(nextProps, nextState){
		return !is(fromJS(this.props), fromJS(nextProps)) || 
				!is(fromJS(this.prop), fromJS(nextState));
	}

	render(){
		let {nav, saleRecord, title, HideList, goback, save, productsInform, applyRecord, params } = this.props;
		let navState = this.state.showHide;
		let indexNavStyle = {};
		if(nav){
			nav = (
				<div className='head_menu' onClick={this.showNav}>
					<ul className='head_listname'>
						<li>
							<IndexLink to='/'>
								<span>销售录入</span>
								<span className='head-arrow'></span>
							</IndexLink>
						</li>
						<li>
							<Link to='/allDeposit'>
								<span>提现</span>
								<span className='head-arow'></span>
							</Link>
						</li>
						<li>
							<Link to='/helpCenter'>
								<span>帮助中心</span>
								<span className='head-arow'></span>
							</Link>
						</li>
					</ul>
				</div>
			)
		};
		if(goback && params){
			goback = (<Link to={'/index'+ params} className='head-goback left'>返回</Link>)
		}else if(goback){
			goback = (<span className='head-goback left' onClick={() => window.history.back()>返回</span>)
		}
		if (title && title === '销售录入') {
			indexNavStyle = {position:'absolute'}
		};
		return (
			<header className ='head-list' style={indexNavStyle}>
				{nav}
				{goback}
				{
					saleRecord && <Link to='/saleRecord' className='head-icon-right'></Link>
				}
				{
					title && <span className='head-title'>{title}</span>
				}
				{
					save && <Link to={'/index' + params} class='head-save right'>确定</Link>
				}
				{
					applyRecord && <Link to='/applyRecord' className='head-icon-right head-applyrecord-right'></Link>
				}
			</header>
		);
	}

}
