import React, { Component } from "react";
import {Outlet, NavLink, useLoaderData, Form, redirect, useNavigation,} from 'react-router-dom'
import { getGifs, createGif } from "../local-gif";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

export async function loader() {
  const gifs = await getGifs();
  return { gifs };
}
export async function action() {
  const gif = await createGif();
  return redirect(`/gifs/${gif.id}/edit`);
}

export default function Root() {
    const { gifs } = useLoaderData(); 
    const navigation = useNavigation();

    return (
      <>
        <div id="sidebar">
          <div>
            <form id="search-form" role="search">
              <input 
                id="q"
                aria-label="Search contacts"
                placeholder="Search"
                type="search"
                name="q"
              />
              <div id="search-spinner" aria-hidden hidden={true} />
              <div className="sr-only" aria-live="polite"></div>
            </form>
            <Form method="post">
              <button type="submit">New</button>
            </Form>
          </div>
          <nav>
            {gifs.length ? (
              <ul>
                {gifs.map((gif) => (
                  <li key={gif.id}>
                    <NavLink to={`gifs/${gif.id}`}>
                      {gif.name ? (
                        <>
                          {gif.name}
                        </>
                      ) : (
                        <i>No Name</i>
                      )}{" "}
                    </NavLink>
                    <NavLink to={`gifs/${gif.id}/edit`} id='edit-btn'>
                      <EditOutlined />
                    </NavLink>
                    <NavLink to={`gifs/${gif.id}/destroy`} id='edit-btn'>
                      <DeleteOutlined />
                    </NavLink>
                  </li>
                ))}
              </ul>
            ) : (
              <p>
                <i>No gifs</i>
              </p>
            )}
          </nav>
          <h1> API Gif</h1>
        </div>
        <div 
          id="content"
          className={
            navigation.state === "loading" ? "loading" : ""
          }
        >
          <Outlet />
        </div>
      </>
    )
}