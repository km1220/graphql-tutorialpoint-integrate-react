import React, { useState, useEffect, useCallback } from 'react'
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost'
import gql from 'graphql-tag'

function ApolloClientPage() {
	const endPointUrl = 'http://localhost:9000/graphql'
	const client = new ApolloClient({
		link: new HttpLink({ uri: endPointUrl }),
		cache: new InMemoryCache()
	});


	async function loadStudentsAsync() {
		const query = gql` {
			students{ 
				id 
				firstName
				lastName
				college {
					name
				}
			}}`
		const { data } = await client.query({ query }); return data.students;
	}

	const [studentData, setStudentData] = useState([])
	const loadStudents = useCallback(async () => {
		const studentData = await loadStudentsAsync();
		setStudentData(studentData)

		console.log("loadStudents", studentData)
	}, [])

	return (
		<div>
			<input type="button" value="loadStudents" onClick={loadStudents} />
			<div>
				<br />
				<hr />
				<table border="3">
					<thead>
						<tr>
							<td>First Name</td>
							<td>Last Name</td>
							<td>college Name</td>
						</tr>
					</thead>
					<tbody>
						{studentData.map(s => {
							return (
								<tr key={s.id}>
									<td> {s.firstName} </td>
									<td> {s.lastName} </td>
									<td> {s.college.name} </td>
								</tr>)
						})}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default ApolloClientPage