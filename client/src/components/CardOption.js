import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const CardOption = ({ selectOption, role }) => {
  const classes = useStyles();

  return (
    <Card
      className={`${classes.card} CardOption-wrapper`}
      onClick={() => selectOption(role.id)}
    >
      <CardActionArea>
        <div className="Card-image">
          <img src={role.image} alt="Context" />
        </div>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {role.title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CardOption;
