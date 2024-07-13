import { UserOutlined } from "@ant-design/icons";
import Input from "antd/es/input";
export default function ProfilePayment() {
	return (
		<div>
			<form action="#" className="grid grid-cols-2 gap-10">
				<div>
					<label htmlFor="name" className="font-bold mb-2 block">
						Your name:
					</label>
					<Input
						id="name"
						name="name"
						placeholder="Enter your name"
						prefix={
							<UserOutlined className="site-form-item-icon" />
						}
					/>
				</div>
				<div>
					<label htmlFor="name" className="font-bold mb-2 block">
						Your name:
					</label>
					<Input
						id="name"
						name="name"
						placeholder="Enter your name"
						prefix={
							<UserOutlined className="site-form-item-icon" />
						}
					/>
				</div>
			</form>
		</div>
	);
}
