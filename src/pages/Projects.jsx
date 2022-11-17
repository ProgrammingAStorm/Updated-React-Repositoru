import { Columns, Container, Box, Content, Heading, Button, Section } from "react-bulma-components";
import { Octokit } from "octokit";
import { useEffect, useState } from "react";
//import { useList } from "react-firebase-hooks/database";

export default function Projects() {
    //const [snapshots, loading, error] = useList()
    const [repos, setRepos] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const octokit = new Octokit();

            const response = await octokit.request("GET /users/{user}/repos", {
                user: "ProgrammingAStorm"
            });

            const data = response.data.map(repo => {
                return {
                    name: repo.name,
                    html_url: repo.html_url,
                    description: repo.description,
                    id: repo.id
                }
            });

            setRepos(data)
        }

        fetchData()
    }, []);

    return (
        <Container
            className="is-flex"
            flexDirection="column"
        >
            <Section>
                <Heading
                    size={2}
                >
                    Notice!
                </Heading>

                <Content>
                    <p>
                        The current implamentation of projects in the page is simple
                        and obtuse for the sake of getting this site done in a timely manner.
                        When the time comes, it will be redone in a more elegant manner.
                    </p>

                    <Heading
                        size={4}
                    >
                        Also!
                    </Heading>

                    <p>
                        Some of projects are hosted on github-pages and their deployment can be
                        accessed from their respective repositories.
                        However, some projects were hosted on free Heroku dynos,
                        and a more permanent solution for them to be hosted on has yet to be implemented.
                        I apologize for the inconvenience.
                    </p>
                </Content>
            </Section>

            {repos ? (
                <Columns
                    multiline
                    gap={1}
                >
                    {
                        repos.map(repo => {
                            return (
                                <Columns.Column
                                    size={'one-quarter'}
                                    key={repo.id}
                                >
                                    <Box>
                                        <Heading
                                            size={6}
                                        >
                                            {repo.name}
                                        </Heading>

                                        <Content>
                                            <p>
                                                {repo.description}
                                            </p>
                                        </Content>

                                        <Button
                                            renderAs="a"
                                            href={repo.html_url}
                                            target="_blank"
                                        >
                                            Repository
                                        </Button>
                                    </Box>
                                </Columns.Column>
                            );
                        })
                    }
                </Columns>
            ) : (
                <Content
                    display="flex"
                    alignItems="center"
                >
                    <Heading>
                        Now Loading...
                    </Heading>
                </Content>
            )}
        </Container>
    );
};