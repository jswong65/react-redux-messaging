import React from 'react';
import moment from 'moment';
import { List, InputItem, NavBar, Icon, Grid } from 'antd-mobile';
import { connect } from 'react-redux';
import { getMsgList, sendMsg, recvMsg, readMsg } from '../actions/chat';
import { getChatId } from '../utils';
import QueueAnim from 'rc-queue-anim';

class Chat extends React.Component{
	constructor(props){
		super(props);
		this.state = { 
			text: '', 
			showEmoji:false
		};
	}
	componentDidMount(){
		if (!this.props.chat.chatMsg.length) {
			this.props.getMsgList();
			this.props.recvMsg();
		}
		console.log(this.props);	
	}
	componentWillUnmount(){
		// update the unread number
		const toId = this.props.match.params.userid;
		this.props.readMsg(toId);
	}
	fixCarousel = () => {
		setTimeout(
			() => window.dispatchEvent(new Event('resize')),
			0);	
	}
	handleSubmit = () => {
		const from = this.props.user._id;
		const to = this.props.match.params.userid;
		const msg = this.state.text;
		this.props.sendMsg({from, to, msg});
		this.setState({ text: '' });
	}
	render = () => {
		const emoji = '😊 😁 😂 🤣 😃 😄 😅 😆 😊 😋 😎 😍 😘 😗 😙 😚 🙂 🤗 🤩 🤔 🤨 😐 🙄 😣 😥 😮 🤐 😯 😪 😫 😴 😌 😛 😜 💪 👈 👉 ☝ 👆 👍 👎 👋 🙌'
						.split(/\s+/) 
						.map(val => ({text: val}));

		const userid = this.props.match.params.userid;
		const Item = List.Item;
		const Brief = Item.Brief;
		const users = this.props.chat.users;
		if (!users[userid]){
			return null;
		}
		const chatId = getChatId(this.props.user._id, userid);
		const chatMsg = this.props.chat.chatMsg.filter(val => val.chatId === chatId);
		return (
			<div id='chat-page' >
				<NavBar 
					mode='dark'
					icon={<Icon type="left" />}
					onLeftClick={() => {
						this.props.history.goBack();
					}}
				>
					{ users[userid].username }
				</NavBar>
				<div style={{height:window.innerHeight - 80,  overflow:'scroll'}}>
					{/*<QueueAnim delay={100} >*/}
						{
							chatMsg.map(val => {
								const avatar = require(`../../static/images/avatar/${users[val.from].avatar}.png`)
								const time = moment(val.create_time);
								return val.from === userid ? (
									<List key={val._id}>
										<Item
											thumb={avatar}
											multipleLine
										>{val.content} <Brief>{time.format('hh:mm a')}</Brief></Item>
									</List>
								) : (
									<List key={val._id}>
										<Item 
											extra={<img alt='avatar' src={avatar} />}
											className='chat-me'
											multipleLine
										>{val.content} <Brief>{time.format('hh:mm a')}</Brief></Item>
									</List>
								)
							})
						}
					{/*</QueueAnim>*/}
				</div>
				<div className="stick-footer">
					<List>
						<InputItem
							placeholder='please enter your message'
							value={ this.state.text }
							onChange={val=> {
								this.setState({ text: val });
							}}
							extra={
								<div>
									<span
										style={{marginRight:15}}
										onClick={() => { this.setState({ 
												showEmoji: !this.state.showEmoji
											}) 
											this.fixCarousel();}
										}
									>😊</span>
									<span onClick={()=>this.handleSubmit()}>submit</span>
								</div>
							}
						/>
						{this.state.showEmoji && (<Grid
								data={emoji}
								columnNum={8}
								carouselMaxRow={4}
								isCarousel={true}
								onClick={el => {
									this.setState({ text: this.state.text + el.text });
								}}
							/>)
						}
					</List>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => ({ user: state.user, chat: state.chat });

export default connect(
	mapStateToProps,
	{ getMsgList, sendMsg, recvMsg, readMsg }
	)(Chat);