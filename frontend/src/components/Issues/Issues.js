import React, {Component} from 'react';
import axios from 'axios';
import IssueItem from '../IssueItem/IssueItem';
import ReactTable from 'react-table'
import "react-table/react-table.css";

class Issues extends Component{
    state = {
        issues: [],
        error: false
    };

    componentDidMount(){
        axios.get('http://localhost:3000/search?jql=project = "GO" AND issuetype in (Bug, Incident, Story) AND status = Done AND Sprint = 35 AND "Start date" >= 2018-1-1 AND "Start date" <= 2018-2-28 ORDER BY cf[10217] ASC, cf[10010] DESC')
            .then(response => {
                const issues = response.data.body.issues.map(issue => {
                    return{
                        ...issue,
                        story: 1
                    }
                });

                this.setState({issues: issues});

                var unorderedArray = this.state.issues;
                var tempArray = [];
                tempArray.push(unorderedArray[0]);

                for (let i = 1; i<unorderedArray.length; i++){
                    if(tempArray.findIndex(x => x.fields.assignee.displayName === unorderedArray[i].fields.assignee.displayName) > -1){
                        let index = tempArray.findIndex(x => x.fields.assignee.displayName === unorderedArray[i].fields.assignee.displayName);
                        tempArray[index].fields.customfield_10002 += unorderedArray[i].fields.customfield_10002;
                        tempArray[index].fields.timespent += unorderedArray[i].fields.timespent;
                        let initialValue_customfield_10010 = tempArray[index].fields.customfield_10010 == null ? 0 : parseInt(tempArray[index].fields.customfield_10010, 10);
                        console.log(initialValue_customfield_10010);
                        tempArray[index].fields.customfield_10010 = initialValue_customfield_10010 + (unorderedArray[i].fields.customfield_10010 == null ? 0 : parseInt(unorderedArray[i].fields.customfield_10010, 10));
                        tempArray[index].story += unorderedArray[i].story;
                    }else{
                        if(unorderedArray[i].fields.customfield_10010==null){
                            unorderedArray[i].fields.customfield_10010 = 0;
                        }
                        tempArray.push(unorderedArray[i]);
                    }
                }
                this.setState({issues: tempArray});
            })
            .catch(error => {
                console.log(error);
                this.setState({error: true})
            })
    }

    render(){
        let issues = <p style={{textAlign: 'center'}}>Something went wrong!</p>;

        if(!this.state.error){
            issues = this.state.issues.map(
                issue => {
                    return (
                            <IssueItem
                                key={issue.key}
                                id={issue.id}
                                name={issue.key}
                                assignee={issue.fields.assignee.displayName}
                                stories={issue.story}
                                storyPoints={issue.fields.customfield_10002}
                                timespent={issue.fields.timespent}
                                timeestimate={issue.fields.customfield_10010}
                            />
                    )
                }
            )
        }


        return (
            <div>
                <ReactTable
                    data={this.state.issues}
                    columns={[
                        {
                            Header: "Developers",
                            columns: [
                                {
                                    id:'developer_name',
                                    Header: "Name",
                                    accessor: d => d.fields.assignee.displayName
                                }
                            ]
                        },
                        {
                            Header: "Stories",
                            columns: [
                                {
                                    id: 'historias',
                                    Header: "Iniciais",
                                    accessor: d => d.story
                                },
                                {
                                    Header: "Finais",
                                    accessor: "status"
                                }
                            ]
                        },
                        {
                            Header: "Pontos",
                            columns: [
                                {
                                    id: 'pontos',
                                    Header: "Iniciais",
                                    accessor: d => d.fields.customfield_10002
                                },
                                {
                                    Header: "Finais",
                                    accessor: "status"
                                }
                            ]
                        },
                        {
                            Header: "Dificuldade",
                            columns: [
                                {
                                    id: 'dificuldade_planeada',
                                    Header: "Planeada",
                                    accessor: d => {return (1-(d.story/d.fields.customfield_10002)).toFixed(2)}
                                },
                                {
                                    Header: "Executada",
                                    accessor: "status"
                                }
                            ]
                        },
                        {
                            Header: "Esforço (min)",
                            columns: [
                                {
                                    id: 'esforço_planeado',
                                    Header: "Planeado",
                                    accessor: d => d.fields.customfield_10010*60
                                },
                                {
                                    id: 'esforço_gasto',
                                    Header: "Gasto",
                                    accessor: d => d.fields.timespent/60
                                }
                            ]
                        }
                    ]}
                    defaultPageSize={10}
                    className="-striped -highlight"
                />
                {/*<ul>*/}
                    {/*{issues}*/}
                {/*</ul>*/}
            </div>
        )
    }
}

export default Issues;