"use client";

interface HeroAvatarProps {
    entered: boolean;
}

export function HeroAvatar({ entered }: HeroAvatarProps) {
    return (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
            src="/nasimul-hasan-1.png"
            alt="Saad Hasan"
            className={`hero-avatar hero-reveal ${entered ? "hero-revealed" : ""}`}
            style={{ transitionDelay: "0s" }}
        />
    );
}
