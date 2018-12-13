import { NavConsumer, NavLink } from "react-navi";
import classnames from "classnames";
import * as React from "react";
import "./AppMenu.css";

export const AppMenu = () => {
    const menus = [
        {
            title: "Top",
            path: "/"
        },
        {
            title: "Number of characters",
            path: "/textstat-rule-number-of-characters/"
        },
        {
            title: "document-dependency",
            path: "/textstat-rule-document-dependency/"
        }
    ];
    return (
        <NavConsumer>
            {({ url }) => {
                return (
                    <ul className="AppMenu">
                        {menus.map(menu => {
                            const isCurrentPath = url.pathname == menu.path;
                            return (
                                <li
                                    key={menu.path}
                                    className={classnames("AppMenu-listItem", {
                                        "is-current": isCurrentPath
                                    })}
                                >
                                    <NavLink href={menu.path}>{menu.title}</NavLink>
                                </li>
                            );
                        })}
                    </ul>
                );
            }}
        </NavConsumer>
    );
};
