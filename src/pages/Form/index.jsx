import React from "react"
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import styles from "./index.css"
import { connect } from "dva";
@Form.create()
@connect(({ center }) => ({
  data: center.data
}))
class NormalLoginForm extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props
    // let that = this
    // setTimeout(() => {
      dispatch({
        type: 'center/getData'
      })
      console.log(this.props.data)

    // }, 4000)

  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { data } = this.props
    console.log(data, "data")
    return (
      <>
        <Form onSubmit={this.handleSubmit} className={styles.loginForm}>
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your username!' }],
              initialValue: 'zs'
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Username"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(<Checkbox>Remember me</Checkbox>)}
            <a className={styles.loginFormForgot} href="/">
              Forgot password
          </a>
            <Button type="primary" htmlType="submit" className={styles.loginFormButton}>
              Log in
          </Button>
          Or <a href="/">register now!</a>
          </Form.Item>
        </Form>
        {data.map(item => <div key={item.value}>{item.name}</div>)}
      </>

    );
  }
}
export default NormalLoginForm

// #components-form-demo-normal-login .login-form {
//   max-width: 300px;
// }
// #components-form-demo-normal-login .login-form-forgot {
//   float: right;
// }
// #components-form-demo-normal-login .login-form-button {
//   width: 100%;
// }