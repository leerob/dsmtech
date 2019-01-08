import styled from 'styled-components';

const Link = styled.a`
    opacity: ${(props) => (props.hasUrl ? '1' : '0.5')};
    cursor: ${(props) => (props.hasUrl ? 'default' : 'not-allowed')};
`;

const Icon = styled.img`
    height: 15px;
    padding-right: 8px;
    width: 15px;
`;

const createUrl = (props) => {
    if (!props.url) {
        return;
    }

    var base = `https://www.${props.type}.com/`;

    if (props.type === 'linkedin') {
        base += 'company/';
    }

    return base + props.url;
};

const SocialLink = (props) => (
    <Link href={createUrl(props)} hasUrl={props.url} target="_blank">
        <Icon alt={`${props.name} ${props.type}`} src={`/static/icons/${props.type}.svg`} />
    </Link>
);

export default SocialLink;
