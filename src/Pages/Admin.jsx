import TeamsInline from "../Components/Teams/TeamsInline";
import UsersInline from "../Components/Users/UsersInline";
import CategoriesInline from "../Components/Categories/CategoriesInline";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "../assets/scss/admin.scss";
import Database from "../Database";
const download = (filename, text) => {
	const element = document.createElement("a");
	element.setAttribute(
		"href",
		"data:text/plain;charset=utf-8," + encodeURIComponent(text)
	);
	element.setAttribute("download", filename);

	element.style.display = "none";
	document.body.appendChild(element);

	element.click();

	document.body.removeChild(element);
};
const Admin = ({ database }) => {
	const navigate = useNavigate();
	const backup = async () => {
		const teams = await Database.Teams.all({ db: database });
		const users = await Database.Users.all({ db: database });
		const matches = await Database.Matches.all({ db: database });
		const qualificationMatches = await Database.QualificationMatches.all({
			db: database,
		});
		const categories = await Database.Categories.all({ db: database });
		const properties = await Database.Properties.all({ db: database });
		const answers = await Database.Answers.all({ db: database });
		const dublicates = await Database.Dublicates.all({ db: database });
		const output = [];
		output.push(JSON.stringify(teams));
		output.push(JSON.stringify(users));
		output.push(JSON.stringify(matches));
		output.push(JSON.stringify(qualificationMatches));
		output.push(JSON.stringify(categories));
		output.push(JSON.stringify(properties));
		output.push(JSON.stringify(answers));
		output.push(JSON.stringify(dublicates));

		download(
			`Backup ${new Date().toLocaleString()}`,
			output.join("SPACER")
		);
	};
	const restore = () => {
		const fileElement = document.createElement("input");
		const onChange = (e) => {
			const file = e.target.files[0];
			const reader = new FileReader();
			reader.readAsText(file, "UTF-8");
			reader.onload = async (e) => {
				const result = e.target.result
					.split("SPACER")
					.map((item) => JSON.parse(item));
				const isOk = window.confirm(
					"This operation is irrecoverable, are you sure?"
				);
				if (!isOk) return;

				const reset = window.confirm(
					"Reset the database? if no please press cancel and the data will be pushed."
				);
				if (reset) {
					console.log("reset database");
					await Database.Teams.clear({ db: database });
					await Database.Answers.clear({ db: database });
					await Database.Categories.clear({ db: database });
					await Database.Matches.clear({ db: database });
					await Database.Properties.clear({ db: database });
					await Database.QualificationMatches.clear({ db: database });
					await Database.Users.clear({ db: database });
					await Database.WaitingMatches.clear({ db: database });
					await Database.Dublicates.clear({ db: database });
					localStorage.removeItem("user");
				}
				for (let i = 0; i < result[0].length; i++) {
					const team = result[0][i];
					try {
						await Database.insertTeam({
							db: database,
							number: team.number,
							name: team.name,
						});
					} catch (error) {}
				}
				console.log("teams done");
				const teams = await Database.Teams.all({ db: database });
				for (let i = 0; i < result[1].length; i++) {
					const user = result[1][i];
					try {
						await Database.insertUser({
							db: database,
							name: user.name,
							username: user.username,
						});
					} catch (error) {}
				}
				const users = await Database.Users.all({ db: database });
				console.log("users done");
				console.log(users);

				let changedMatches = [];
				let tmpMatches = (
					await Database.Matches.all({ db: database })
				).map((item) => {
					return {
						number: item.number,
						teamId: item.team,
						id: item.id,
					};
				});
				for (let i = 0; i < result[2].length; i++) {
					const match = result[2][i];
					try {
						const data = {
							number: match.number,
							teamId: teams.filter(
								(newTeam) =>
									result[0].filter(
										(oldTeam) => oldTeam.id === match.team
									)[0].number === newTeam.number
							)[0].id,
						};
						const dublicate = tmpMatches.filter(
							(match) =>
								match.number === data.number &&
								match.teamId === data.teamId
						);
						if (dublicate.length) {
							console.log("dublicate");
							continue;
						}
						const matchID = await Database.insertMatch({
							db: database,
							number: data.number,
							team_id: data.teamId,
							user_id: users[0].id,
						});
						tmpMatches.push(data);
						changedMatches.push([match.id, matchID]);
					} catch (error) {
						console.error(error);
					}
				}
				const matches = await Database.Matches.all({ db: database });

				for (let i = 0; i < result[3].length; i++) {
					const qualificationMatch = result[3][i];
					try {
						await Database.QualificationMatches.insert({
							db: database,
							number: qualificationMatch.number,
							blueTeams: qualificationMatch.blue.map(
								(blueTeam) =>
									teams.filter(
										(newTeam) =>
											result[0].filter(
												(oldTeam) =>
													oldTeam.number === blueTeam
											)[0].number === newTeam.number
									)[0].number
							),
							redTeams: qualificationMatch.red.map(
								(redTeam) =>
									teams.filter(
										(newTeam) =>
											result[0].filter(
												(oldTeam) =>
													oldTeam.number === redTeam
											)[0].number === newTeam.number
									)[0].number
							),
						});
					} catch (error) {}
				}
				for (let i = 0; i < result[4].length; i++) {
					const category = result[4][i];
					try {
						await Database.insertCategory({
							db: database,
							title: category.title,
						});
					} catch (error) {}
				}
				const categories = await Database.Categories.all({
					db: database,
				});
				for (let i = 0; i < result[5].length; i++) {
					const property = result[5][i];
					try {
						await Database.insertProperty({
							db: database,
							category_id: categories.filter(
								(newCategory) =>
									result[4].filter(
										(oldCategory) =>
											oldCategory.id === property.category
									)[0].title === newCategory.title
							)[0].id,
							title: property.title,
							type: property.type,
						});
					} catch (error) {}
				}
				const properties = await Database.Properties.all({
					db: database,
				});
				for (let i = 0; i < matches.length; i++) {
					const match = matches[i];
					const matchAnswers = result[6].filter((answer) => {
						const ay = changedMatches.filter(
							(item) => item[0] === answer.match
						);
						return ay.length ? ay[0][1] === match.id : false;
					});
					for (let k = 0; k < matchAnswers.length; k++) {
						const answer = matchAnswers[k];
						try {
							await Database.insertAnswer({
								db: database,
								content: answer.content,
								match_id: changedMatches.filter(
									(item) => item[0] === answer.match
								)[0][1],
								property_id: properties.filter(
									(newProperty) =>
										result[5].filter(
											(oldProperty) =>
												oldProperty.id ===
												answer.property
										)[0].title === newProperty.title
								)[0].id,
							});
						} catch (error) {}
					}
				}
				for (let i = 0; i < result[7].length; i++) {
					const answer = result[7][i];
					const match = matches.filter(
						(match) =>
							result[2].filter(
								(oldMatch) =>
									oldMatch.number === match.number &&
									match.team ==
										teams.filter(
											(newTeam) =>
												result[0].filter(
													(oldTeam) =>
														oldTeam.id ===
														oldMatch.team
												)[0].number === newTeam.number
										)[0].id
							).length
					)[0];
					await Database.Dublicates.insert({
						db: database,
						content: answer.content,
						match_id: match.id,
						property_id: properties.filter(
							(newProperty) =>
								result[5].filter(
									(oldProperty) =>
										oldProperty.id === answer.property
								)[0].title === newProperty.title
						)[0].id,
					});
				}

				alert("Completed now reload the page");
			};
		};
		fileElement.onchange = onChange;
		fileElement.type = "file";
		fileElement.click();
	};
	const reset = async () => {
		const isSure = window.confirm("Are you sure?");
		if (!isSure) return;
		await Database.Teams.clear({ db: database });
		await Database.Answers.clear({ db: database });
		await Database.Categories.clear({ db: database });
		await Database.Matches.clear({ db: database });
		await Database.Properties.clear({ db: database });
		await Database.QualificationMatches.clear({ db: database });
		await Database.Users.clear({ db: database });
		await Database.WaitingMatches.clear({ db: database });
		await Database.Dublicates.clear({ db: database });
		localStorage.removeItem("user");
		alert("done");
		navigate("/admin");
	};
	return (
		<div className="admin">
			<div className="teams">
				<div className="actions">
					<Link className="action" to="/queue/load">
						Queue Load
					</Link>
					<button className="action" onClick={backup}>
						Backup
					</button>
					<button className="action" onClick={restore}>
						Restore
					</button>
					<Link className="action" to="/analytics">
						Analytics
					</Link>
					<button className="action" onClick={reset}>
						Reset
					</button>
					<Link className="action" to="/schedule/transfer">
						Transfer Schedule
					</Link>
				</div>
				<TeamsInline database={database}></TeamsInline>
				<UsersInline database={database}></UsersInline>
				<CategoriesInline database={database}></CategoriesInline>
			</div>
			<div className="users"></div>
		</div>
	);
};

export default Admin;
