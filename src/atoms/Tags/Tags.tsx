import { Badge } from "react-bootstrap";
import { TagsProps } from "../../utils/interfaces";
import { badgeBackground } from "../../utils/utilsObjects";

export const Tags = ({ article, variant }: TagsProps) => {
	return (
		<div className="d-flex flex-row justify-content-start gap-1 align-items-center mt-1 mb-1 flex-wrap w-100">
			{article?.tags[0] !== ""
				? article?.tags.map((tag: string) => {
						if (tag === "") {
							return;
						}
                        if (variant === "small") {
						return (
							<h6 key={tag}><Badge
								bg={
									badgeBackground[
										Math.floor(
											Math.random() *
												badgeBackground.length
										)
									]
								}
							>
								{tag}
							</Badge></h6>
						);
                    }
                    if (!variant || variant === "normal") {
						return (
							<h5 key={tag}><Badge
								bg={
									badgeBackground[
										Math.floor(
											Math.random() *
												badgeBackground.length
										)
									]
								}
							>
								{tag}
							</Badge></h5>
						);
                    }
				  })
				: <div style={{fontSize: `${variant === "small" ? "10px" : "14px"}`}}>Nie ma żadnych tagów do tego artykułu</div>}
		</div>
	);
};
