import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Injectable({ providedIn: 'root' })
export class TodoService {
  constructor(private apollo: Apollo) {}

  getTodos() {
    return this.apollo.watchQuery({
      query: gql`
        query {
          getTodos {
            id
            title
            completed
          }
        }
      `,
    }).valueChanges;
  }

  addTodo(title: string) {
    return this.apollo.mutate({
      mutation: gql`
        mutation ($title: String!) {
          addTodo(title: $title) {
            id
            title
            completed
          }
        }
      `,
      variables: { title },
      refetchQueries: [{ query: gql`query { getTodos { id title completed } }` }],
    });
  }

  toggleTodo(id: string) {
    return this.apollo.mutate({
      mutation: gql`
        mutation ($id: ID!) {
          toggleTodo(id: $id) {
            id
            completed
          }
        }
      `,
      variables: { id },
      refetchQueries: [{ query: gql`query { getTodos { id title completed } }` }],
    });
  }

  deleteTodo(id: string) {
    return this.apollo.mutate({
      mutation: gql`
        mutation ($id: ID!) {
          deleteTodo(id: $id)
        }
      `,
      variables: { id },
      refetchQueries: [{ query: gql`query { getTodos { id title completed } }` }],
    });
  }
}