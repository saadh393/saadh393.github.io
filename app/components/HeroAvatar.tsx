"use client";

interface HeroAvatarProps {
    entered: boolean;
}

export function HeroAvatar({ entered }: HeroAvatarProps) {
    return (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
            src="https://saadh393.github.io/images/saad-2.jpg"
            alt="Saad Hasan"
            className={`hero-avatar hero-reveal ${entered ? "hero-revealed" : ""}`}
            style={{ transitionDelay: "0s" }}
        />
    );
}
