const TweetEmbed = (props: { url: string }) => {
  return (
    <blockquote className="twitter-tweet">
      <a href={props.url}></a>
    </blockquote>
  );
};

export default TweetEmbed;
