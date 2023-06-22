interface EmailTemplateProps {
    snakeName: string;
}

export const EmailTemplate = ({
    snakeName,
}: EmailTemplateProps) => (
    <div>
        <h1>It&apos;s time to feed {snakeName}!</h1>
    </div>
);
