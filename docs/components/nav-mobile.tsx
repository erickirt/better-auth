"use client";
import { Menu } from "lucide-react";
import Link from "next/link";
import { Fragment, createContext, useContext, useState } from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { AnimatePresence, FadeIn } from "@/components/ui/fade-in";

interface NavbarMobileContextProps {
    isOpen: boolean;
    toggleNavbar: () => void;
}

const NavbarContext = createContext<NavbarMobileContextProps | undefined>(
    undefined,
);

export const NavbarProvider = ({ children }: { children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => {
        setIsOpen((prevIsOpen) => !prevIsOpen);
    };
    // @ts-ignore
    return (
        <NavbarContext.Provider value={{ isOpen, toggleNavbar }}>
            {children}
        </NavbarContext.Provider>
    );
};

export const useNavbarMobile = (): NavbarMobileContextProps => {
    const context = useContext(NavbarContext);
    if (!context) {
        throw new Error(
            "useNavbarMobile must be used within a NavbarMobileProvider",
        );
    }
    return context;
};

export const NavbarMobileBtn: React.FC = () => {
    const { toggleNavbar } = useNavbarMobile();

    return (
        <button
            className="text-muted-foreground ml-auto px-2.5 block md:hidden"
            onClick={toggleNavbar}
            data-umami-event="navbar-mobile-trigger"
        >
            <Menu />
        </button>
    );
};

export const NavbarMobile = () => {
    const { isOpen, toggleNavbar } = useNavbarMobile();

    return (
        <AnimatePresence>
            {isOpen && (
                <FadeIn
                    fromTopToBottom
                    className="absolute top-[57px] left-0 bg-background h-[calc(100%-57px-27px)] w-full z-50 p-5 divide-y overflow-y-auto"
                >
                    {navMenu.map((menu, i) => (
                        <Fragment key={menu.name}>
                            {menu.child ? (
                                <Accordion type="single" collapsible>
                                    <AccordionItem value={menu.name}>
                                        <AccordionTrigger
                                            className="text-2xl font-normal text-foreground"
                                            data-umami-event={`navbar-accordion-${menu.name}`}
                                        >
                                            {menu.name}
                                        </AccordionTrigger>
                                        <AccordionContent className="pl-5 divide-y">
                                            {menu.child.map((child, j) => (
                                                <Link
                                                    href={child.path}
                                                    key={child.name}
                                                    className="block text-xl py-2 first:pt-0 last:pb-0 border-b last:border-0 text-muted-foreground"
                                                    onClick={toggleNavbar}
                                                >
                                                    {child.name}
                                                </Link>
                                            ))}
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            ) : (
                                <Link
                                    href={menu.path}
                                    className="block text-2xl py-4 first:pt-0 last:pb-0"
                                    onClick={toggleNavbar}
                                >
                                    {menu.name}
                                </Link>
                            )}
                        </Fragment>
                    ))}
                </FadeIn>
            )}
        </AnimatePresence>
    );
};

export const navMenu = [
    {
        name: "_hello",
        path: "/",
    },

    {
        name: "_blogs",
        path: "/blogs",
    },
    {
        name: "_docs",
        child: [
            {
                name: "Introduction to better-auth",
                path: "/docs/index",
            },
            {
                name: "Setting up the better-auth",
                path: "/docs/setting-up",
            },
            {
                name: "Adding a plug",
                path: "/docs/plugins",
            },
            {
                name: "Org support",
                path: "/docs/org-support",
            },
            {
                name: "Compoent UI libs",
                path: "/docs/lib-ui-componnts",
            },
            {
                name: "Adapter Suppor",
                path: "/docs/adapter-support",
            },
            {
                name: "Framework Support",
                path: "/docs/framework-support",
            },
        ],
    },
];
